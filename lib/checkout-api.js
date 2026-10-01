const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = function createCheckout({ state, persist, send, clean, hash, allow, validStand, standKey, permitted, stateFile, receipts }) {
  const proofDir = `${stateFile}.receipts`;
  const activeStates = ['awaiting_payment','pending_review','correction','approved'];
  const fail = (message, status=400) => { throw Object.assign(new Error(message), {status}); };
  function expire() {
    let changed=false;
    for (const row of state.orders) if (row.status==='awaiting_payment' && row.expiresAt<Date.now()) {
      row.status='expired'; changed=true;
    }
    if (changed) persist();
  }
  const holder = key => state.orders.find(row => standKey(row.sectorId,row.stand)===key && activeStates.includes(row.status));
  function imageData(raw) {
    const match = /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/]+={0,2})$/.exec(String(raw || ''));
    if (!match) fail('Seleccione una imagen JPG, PNG o WEBP.');
    const bytes=Buffer.from(match[2],'base64');
    if (!bytes.length || bytes.length>3*1024*1024) fail('La imagen debe pesar como máximo 3 MB.');
    const valid = match[1]==='png' ? bytes.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex')) :
      match[1]==='jpeg' ? bytes[0]===255 && bytes[1]===216 && bytes[2]===255 :
      bytes.toString('ascii',0,4)==='RIFF' && bytes.toString('ascii',8,12)==='WEBP';
    if (!valid) fail('La imagen no corresponde al formato indicado.');
    return {bytes,mime:`image/${match[1]}`};
  }
  function visible(row) {
    return {id:row.id,sectorId:row.sectorId,stand:row.stand,name:row.name,phone:row.phone,status:row.status,
      createdAt:row.createdAt,expiresAt:row.expiresAt,proofAt:row.proofAt,reviewNote:row.reviewNote || '',
      confirmedAt:row.confirmedAt,hasProof:!!row.proofFile};
  }
  function lookup(token) {
    if (!/^[a-f0-9]{64}$/.test(String(token || ''))) fail('No se encontró esta compra.',404);
    const row=state.orders.find(item => item.accessHash===hash(token));
    if (!row) fail('No se encontró esta compra.',404);
    return row;
  }
  const settings = () => {
    const testMode=state.paymentSettings.testMode===true;
    return {enabled:!!(state.paymentSettings.enabled && (testMode || (state.paymentSettings.qrData && state.paymentSettings.holder))),
      holder:state.paymentSettings.holder || (testMode?'FITROP 2026 · modo de prueba':''),whatsapp:state.paymentSettings.whatsapp || '',
      hasQr:!!state.paymentSettings.qrData,testMode};
  };
  async function get(req,res,pathname) {
    if (req.method!=='GET') return false;
    if (pathname==='/api/payment') { send(res,200,settings()); return true; }
    if (pathname==='/api/payment/qr' || pathname==='/api/admin/payment/qr') {
      if (pathname.startsWith('/api/admin/') && !permitted(req)) {send(res,401,{error:'Acceso requerido'});return true;}
      if (!state.paymentSettings.qrData || (pathname==='/api/payment/qr' && !settings().enabled)) { send(res,404,{error:'El pago por QR todavía no está habilitado.'}); return true; }
      const data=imageData(state.paymentSettings.qrData);
      res.writeHead(200,{'Content-Type':data.mime,'Content-Disposition':`inline; filename="QR-FITROP.${data.mime.split('/')[1]}"`,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}); res.end(data.bytes); return true;
    }
    if (pathname.startsWith('/api/admin/order-proof/')) {
      if (!permitted(req)) { send(res,401,{error:'Acceso requerido'}); return true; }
      const row=state.orders.find(item=>item.id===pathname.split('/').pop());
      if (!row?.proofFile) { send(res,404,{error:'Comprobante no encontrado'}); return true; }
      const content=receipts ? await receipts.read(row.proofFile) : fs.readFileSync(path.join(proofDir,row.proofFile));
      res.writeHead(200,{'Content-Type':row.proofMime,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
      res.end(content); return true;
    }
    return false;
  }
  async function post(req,res,pathname,body) {
    const routes=['/api/orders/start','/api/orders/status','/api/orders/proof','/api/orders/cancel','/api/admin/payment','/api/admin/orders/review'];
    if (!routes.includes(pathname)) return false;
    if (pathname.startsWith('/api/admin/') && !permitted(req)) fail('Acceso requerido',401);
    if (pathname==='/api/admin/payment') {
      const next={holder:clean(body.holder,100),whatsapp:clean(body.whatsapp,20).replace(/\D/g,''),enabled:body.enabled===true,testMode:body.testMode===true,
        qrData:body.qrData || state.paymentSettings.qrData || ''};
      if (next.qrData) imageData(next.qrData);
      if (next.whatsapp && !/^\d{8,15}$/.test(next.whatsapp)) fail('Indique el WhatsApp con código de país, por ejemplo 591…');
      if (next.enabled && next.testMode && !next.holder) next.holder='FITROP 2026 · modo de prueba';
      if (next.enabled && !next.testMode && (!next.holder || !next.qrData || !next.whatsapp)) fail('Para activar el pago indique titular, WhatsApp y QR.');
      state.paymentSettings=next; persist(); send(res,200,settings()); return true;
    }
    if (pathname==='/api/orders/start') {
      if (!allow(req,'checkout',15)) fail('Demasiados intentos. Espere unos minutos.',429);
      if (!/^[a-f0-9]{64}$/.test(String(body.token || ''))) fail('Actualice la página e intente de nuevo.');
      const accessHash=hash(body.token), prior=state.orders.find(row=>row.accessHash===accessHash);
      if (prior) { send(res,200,{order:visible(prior)}); return true; }
      if (!settings().enabled) fail('FITROP todavía no habilitó el QR de pago.',409);
      const sectorId=clean(body.sectorId,40),stand=Number(body.stand),key=standKey(sectorId,stand);
      if (!validStand(sectorId,stand)) fail('Seleccione un puesto válido.');
      if (state.inventory[key]?.status!=='available' || holder(key) || state.codes.some(code=>code.standKey===key && code.status==='issued' && code.expiresAt>Date.now()))
        fail('Este puesto ya no está disponible. Elija otro en el croquis.',409);
      const name=clean(body.name,100),phone=clean(body.phone,40);
      if (name.length<2 || phone.replace(/\D/g,'').length<7) fail('Indique su nombre y un número de WhatsApp válido.');
      const row={id:`COMP-${crypto.randomBytes(6).toString('hex').toUpperCase()}`,accessHash,sectorId,stand,name,phone,
        status:'awaiting_payment',createdAt:new Date().toISOString(),expiresAt:Date.now()+30*60*1000};
      state.orders.unshift(row); persist(); send(res,201,{order:visible(row)}); return true;
    }
    if (pathname==='/api/orders/status') {
      if (!allow(req,'order-status',1000)) fail('Espere un momento antes de actualizar.',429);
      send(res,200,{order:visible(lookup(body.token))}); return true;
    }
    if (pathname==='/api/orders/cancel') {
      const row=lookup(body.token);
      if(row.status!=='awaiting_payment') fail('Esta compra ya tiene un comprobante o está cerrada. Consulte con FITROP.',409);
      row.status='cancelled';row.reviewNote='El comprador volvió a elegir antes de enviar un comprobante.';
      persist();send(res,200,{order:visible(row)});return true;
    }
    if (pathname==='/api/orders/proof') {
      if (!allow(req,'order-proof',20)) fail('Demasiados intentos. Espere unos minutos.',429);
      const row=lookup(body.token);
      if (row.status==='pending_review') { send(res,200,{order:visible(row)}); return true; }
      if (!['awaiting_payment','correction'].includes(row.status)) fail('Esta compra ya no admite comprobantes. Consulte con FITROP.',409);
      const file=imageData(body.image);
      const filename=`${row.id}.image`,temp=path.join(proofDir,`${filename}.tmp`);
      if (receipts) await receipts.write(filename,file.bytes);
      else {
        fs.mkdirSync(proofDir,{recursive:true});
        fs.writeFileSync(temp,file.bytes,{mode:0o600}); fs.renameSync(temp,path.join(proofDir,filename));
      }
      Object.assign(row,{proofFile:filename,proofMime:file.mime,proofAt:new Date().toISOString(),status:'pending_review',reviewNote:''});
      persist(); send(res,200,{order:visible(row)}); return true;
    }
    const row=state.orders.find(item=>item.id===body.id);
    if (!row || !activeStates.includes(row.status)) fail('Esta compra no admite cambios.',409);
    const key=standKey(row.sectorId,row.stand);
    if (body.action==='approve') {
      if (!['pending_review','approved'].includes(row.status) || !row.proofFile || body.paymentVerified!==true)
        fail('Abra el comprobante y confirme que verificó el pago.');
      if (['reserved','sold','blocked'].includes(state.inventory[key]?.status)) fail('El puesto ya no está disponible.',409);
      state.codes.forEach(item=>{if(item.standKey===key && item.status==='issued') item.status='revoked';});
      const code=`FT-${crypto.randomBytes(5).toString('hex').toUpperCase()}`,issuedAt=new Date().toISOString();
      state.codes.push({id:crypto.randomUUID(),standKey:key,codeHash:hash(code),status:'issued',buyerName:row.name,
        organization:'',phone:row.phone,orderId:row.id,issuedAt,expiresAt:Date.now()+7*24*60*60*1000});
      Object.assign(row,{status:'approved',reviewNote:'',approvedAt:issuedAt}); persist();
      send(res,200,{order:visible(row),code}); return true;
    }
    const note=clean(body.note,300);
    if (!['correction','cancel'].includes(body.action) || !note) fail('Indique el motivo de la revisión.');
    if (body.action==='correction' && row.status!=='pending_review') fail('Solo se corrigen comprobantes pendientes.',409);
    state.codes.forEach(item=>{if(item.orderId===row.id && item.status==='issued') item.status='revoked';});
    row.status=body.action==='cancel'?'cancelled':'correction'; row.reviewNote=note;
    persist(); send(res,200,{order:visible(row)}); return true;
  }
  function overlay(records) {
    for (const code of state.codes) if (code.status==='issued' && code.expiresAt>Date.now() && !['reserved','sold','blocked'].includes(records[code.standKey]?.status))
      records[code.standKey]={status:'pending',buyerName:'',organization:''};
    for (const row of state.orders) if(activeStates.includes(row.status)) records[standKey(row.sectorId,row.stand)]={status:'pending',buyerName:'',organization:''};
    return records;
  }
  function confirm(code,confirmedAt) {
    if (!code.orderId) return;
    const row=state.orders.find(item=>item.id===code.orderId);
    if (!row || row.status!=='approved') fail('Esta compra no está aprobada.',409);
    row.status='confirmed'; row.confirmedAt=confirmedAt;
  }
  return {expire,holder,get,post,overlay,confirm,
    adminState:()=>({orders:state.orders.map(visible),paymentSettings:settings()})};
};
