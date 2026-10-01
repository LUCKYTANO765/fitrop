const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const net = require('net');

const COUNTS = Object.fromEntries([
  ['instituciones',93],['piscicultura',16],['apicultura',19],['cacao',12],['pina',12],['banano',12],
  ['pitahaya',12],['palmito',12],['hoja-coca',38],['materiales',20],['turismo',30],['maquinaria',110],
  ['empresarial',67],['industrial',105],['bienes-raices',24],['artesanos',72],['comerciantes',84],
  ['mobiliario',36],['plantines',38],['ganaderia',81],['plaza-comidas',141]
]);
if (Object.values(COUNTS).reduce((total, count) => total + count, 0) !== 1034) throw new Error('Catálogo inconsistente');
function createApi(options = {}) {
const STATE_FILE = process.env.FITROP_DATA_FILE || path.join(__dirname, '..', 'data', 'stand-state.json');
const ADMIN_USER = process.env.FITROP_ADMIN_USER || 'admin@fitrop.bo';
const AUTH_FILE = process.env.FITROP_DATA_FILE ? `${process.env.FITROP_DATA_FILE}.auth` : path.join(__dirname, '..', 'data', 'admin-auth.json');
function adminAuth() {
  if (options.auth) return options.auth;
  if (process.env.FITROP_ADMIN_PASSWORD) {
    const salt='environment';
    return { salt, digest:crypto.scryptSync(process.env.FITROP_ADMIN_PASSWORD,salt,64).toString('hex') };
  }
  try { return JSON.parse(fs.readFileSync(AUTH_FILE,'utf8')); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const password=`FT-${crypto.randomBytes(10).toString('base64url')}`;
    const salt=crypto.randomBytes(16).toString('hex');
    const record={ salt,digest:crypto.scryptSync(password,salt,64).toString('hex') };
    fs.mkdirSync(path.dirname(AUTH_FILE),{ recursive:true });
    fs.writeFileSync(AUTH_FILE,JSON.stringify(record),{ mode:0o600 });
    console.log(`Acceso administrativo inicial: ${ADMIN_USER} / ${password}`);
    return record;
  }
}
const ADMIN_AUTH = adminAuth();
const sessions = new Map();
const attempts = new Map();
function load() {
  try {
    const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    return { inventory: data.inventory || {}, requests: data.requests || [], codes: data.codes || [], socialLinks: data.socialLinks || {}, orders:data.orders || [], paymentSettings:data.paymentSettings || {} };
  } catch (error) { if (error.code === 'ENOENT') return { inventory:{}, requests:[], codes:[], socialLinks:{}, orders:[],paymentSettings:{} }; throw error; }
}
let state = options.state || load();
function persist() {
  if (options.state) return;
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive:true });
  const temp = `${STATE_FILE}.${process.pid}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(state, null, 2), { mode:0o600 });
  fs.renameSync(temp, STATE_FILE);
}
function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store',
    'X-Content-Type-Options':'nosniff', ...headers });
  res.end(JSON.stringify(body));
}
function parseBody(req, limit = 16384) {
  // Vercel can parse the body before invoking the function.
  if (req.body !== undefined) {
    try {
      const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      if (Buffer.byteLength(raw) > limit) throw Object.assign(new Error('Solicitud demasiado grande'), {status:413});
      return Promise.resolve(JSON.parse(raw));
    } catch (error) { return Promise.reject(error.status ? error : Object.assign(new Error('JSON inválido'), {status:400})); }
  }
  return new Promise((resolve,reject) => {
    const parts = []; let bytes = 0;
    req.on('data', chunk => { bytes += chunk.length; if (bytes > limit) {
      reject(Object.assign(new Error('Solicitud demasiado grande'),{ status:413 })); req.destroy();
    } else parts.push(chunk); });
    req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(parts).toString('utf8'))); }
      catch (_) { reject(Object.assign(new Error('JSON inválido'),{ status:400 })); } });
    req.on('error',reject);
  });
}
const clean = (value, max) => String(value || '').trim().slice(0,max);
const validStand = (sector, stand) => Number.isSafeInteger(stand) && stand >= 1 && stand <= COUNTS[sector];
const standKey = (sector, stand) => `${sector}:${stand}`;
const hash = value => crypto.createHash('sha256').update(String(value || '').trim().toUpperCase()).digest('hex');
for (const [token, expiry] of Object.entries(state._sessions || {})) if (expiry > Date.now()) sessions.set(token,expiry);
for (const [key, record] of Object.entries(state._attempts || {})) if (Date.now()-record.start < 600000) attempts.set(key,record);
function permitted(req) {
  const token = /(?:^|;\s*)fitrop_session=([a-f0-9]+)/.exec(req.headers.cookie || '')?.[1];
  const expiry = token && sessions.get(token);
  if (expiry && expiry > Date.now()) return true;
  if (token) sessions.delete(token);
  return false;
}
function allow(req, action, limit) {
  // Quick Tunnel connects over loopback; Cloudflare supplies each visitor's IP.
  const forwarded = req.headers['cf-connecting-ip'];
  const address = req.socket?.remoteAddress || 'unknown';
  const vercelIP = process.env.VERCEL && req.headers['x-forwarded-for']?.split(',')[0].trim();
  const visitor = vercelIP && net.isIP(vercelIP) ? vercelIP : ['127.0.0.1','::1','::ffff:127.0.0.1'].includes(address) &&
    typeof forwarded === 'string' && net.isIP(forwarded) ? forwarded : address;
  const key = `${action}:${visitor}`;
  const now = Date.now(), record = attempts.get(key) || { start:now, count:0 };
  if (now-record.start > 600000) { record.start=now; record.count=0; }
  record.count++; attempts.set(key,record);
  return record.count <= limit;
}
function publicInventory() {
  return checkout.overlay(Object.fromEntries(Object.entries(state.inventory).map(([key, record]) => [key, {
    status:record.status,
    buyerName:['reserved','sold'].includes(record.status) ? record.buyerName || '' : '',
    organization:['reserved','sold'].includes(record.status) ? record.organization || '' : ''
  }])));
}
function revoke(stand) {
  state.codes.forEach(item => { if (item.standKey === stand && item.status === 'issued') item.status='revoked'; });
}
async function handle(req,res,pathname) {
  try {
    checkout.expire();
    if (await checkout.get(req,res,pathname)) return;
    if (req.method === 'GET' && pathname === '/api/social-links') return send(res,200,{ socialLinks:state.socialLinks });
    if (req.method === 'GET' && pathname === '/api/inventory') return send(res,200,{ inventory:publicInventory() });
    if (req.method === 'GET' && pathname === '/api/admin/session') return send(res,200,{ authenticated:permitted(req) });
    if (req.method === 'GET' && pathname === '/api/admin/state') {
      if (!permitted(req)) return send(res,401,{ error:'Acceso requerido' });
      return send(res,200,{ inventory:state.inventory, requests:state.requests, socialLinks:state.socialLinks,
        codes:state.codes.map(({ codeHash, ...item }) => item),...checkout.adminState() });
    }
    if (req.method !== 'POST') return send(res,405,{ error:'Método no permitido' });
    const origin = req.headers.origin;
    if (origin && new URL(origin).host !== req.headers.host) return send(res,403,{ error:'Origen no permitido' });
    const body = await parseBody(req, ['/api/orders/proof','/api/admin/payment'].includes(pathname) ? 4300000 : pathname === '/api/admin/import-local' ? 1024 * 1024 : 16384);
    if (await checkout.post(req,res,pathname,body)) return;
    if (pathname === '/api/admin/login') {
      if (!allow(req,'login',12)) return send(res,429,{ error:'Demasiados intentos. Espere unos minutos.' });
      const actual = crypto.scryptSync(String(body.password || ''),ADMIN_AUTH.salt,64);
      const expected = Buffer.from(ADMIN_AUTH.digest,'hex');
      if (clean(body.user || ADMIN_USER,120) !== ADMIN_USER || !crypto.timingSafeEqual(actual,expected)) return send(res,401,{ error:'Código de acceso incorrecto' });
      const token = crypto.randomBytes(32).toString('hex');
      sessions.set(token,Date.now()+28800000);
      return send(res,200,{ authenticated:true },{ 'Set-Cookie':`fitrop_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${process.env.VERCEL ? '; Secure' : ''}` });
    }
    if (pathname === '/api/admin/logout') {
      const token = /(?:^|;\s*)fitrop_session=([a-f0-9]+)/.exec(req.headers.cookie || '')?.[1];
      if (token) sessions.delete(token);
      return send(res,200,{ authenticated:false },{ 'Set-Cookie':'fitrop_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0' });
    }
    if (pathname === '/api/requests') {
      if (!allow(req,'request',30)) return send(res,429,{ error:'Demasiadas solicitudes. Espere unos minutos.' });
      const sectorId=clean(body.sectorId,40), stand=Number(body.stand);
      const manzana=Number(body.manzana), lote=Number(body.lote);
      const isLot=!sectorId && Number.isSafeInteger(manzana) && manzana>0 && Number.isSafeInteger(lote) && lote>0;
      if (!isLot && !validStand(sectorId,stand)) return send(res,400,{ error:'Puesto inválido' });
      if (!isLot && ['reserved','sold','blocked'].includes(state.inventory[standKey(sectorId,stand)]?.status)) return send(res,409,{ error:'Este puesto ya no recibe solicitudes' });
      const name=clean(body.name,100), phone=clean(body.phone,40);
      if (!name || !phone) return send(res,400,{ error:'Indique nombre y teléfono' });
      const request={ id:`SOL-${crypto.randomBytes(5).toString('hex').toUpperCase()}`,
        sectorId:isLot?'':sectorId, stand:isLot?lote:stand, manzana:isLot?manzana:null,
        name,phone,organization:clean(body.organization,100),email:clean(body.email,120),
        notes:clean(body.notes,500),status:'new',createdAt:new Date().toISOString() };
      state.requests.unshift(request); persist();
      return send(res,201,{ id:request.id });
    }
    if (pathname === '/api/redeem') {
      if (!allow(req,'redeem',20)) return send(res,429,{ error:'Demasiados intentos. Espere unos minutos.' });
      const codeHash=hash(body.code);
      const code=state.codes.find(item => item.codeHash===codeHash && item.status==='issued');
      if (!code || code.expiresAt<Date.now()) return send(res,400,{ error:'Código inválido, vencido o para otro puesto' });
      const [sectorId,number]=code.standKey.split(':'),stand=Number(number),key=code.standKey,existing=state.inventory[key];
      if ((body.sectorId && body.sectorId!==sectorId) || (body.stand && Number(body.stand)!==stand)) return send(res,400,{error:'El código corresponde a otro puesto'});
      if (['reserved','sold','blocked'].includes(existing?.status)) return send(res,409,{ error:'El puesto ya no puede reservarse' });
      const confirmedAt=new Date().toISOString();
      checkout.confirm(code,confirmedAt);
      code.status='redeemed'; code.redeemedAt=new Date().toISOString();
      state.inventory[key]={ status:'reserved',buyerName:code.buyerName,organization:code.organization,
        phone:code.phone,notes:existing?.notes || '',paymentVerifiedAt:code.issuedAt,
        reservedAt:code.redeemedAt,updatedAt:code.redeemedAt };
      if (code.requestId) { const row=state.requests.find(item => item.id===code.requestId); if (row) row.status='closed'; }
      persist(); return send(res,200,{ status:'reserved',buyerName:code.buyerName,sectorId,stand,confirmedAt,reference:code.orderId || code.id });
    }
    if (!permitted(req)) return send(res,401,{ error:'Acceso requerido' });
    if (pathname === '/api/admin/open-sector') {
      const sectorId=clean(body.sectorId,40);
      if (!validStand(sectorId,1)) return send(res,400,{error:'Sector inválido'});
      let changed=0;
      for(let stand=1;validStand(sectorId,stand);stand++) {
        const key=standKey(sectorId,stand),record=state.inventory[key];
        if ((record && record.status!=='unassigned') || record?.buyerName || record?.phone || checkout.holder(key) || state.codes.some(code=>code.standKey===key && code.status==='issued' && code.expiresAt>Date.now())) continue;
        state.inventory[key]={...(record || {}),status:'available',updatedAt:new Date().toISOString()}; changed++;
      }
      persist(); return send(res,200,{changed});
    }
    if (pathname === '/api/admin/social-links') {
      const allowed=['facebook','x','instagram','youtube','tiktok'];
      const links={};
      for (const name of allowed) {
        const raw=clean(body[name],500);
        if (!raw) continue;
        let url;
        try { url=new URL(raw); } catch (_) { return send(res,400,{ error:`Enlace inválido para ${name}` }); }
        if (!['http:','https:'].includes(url.protocol) || !url.hostname || url.username || url.password)
          return send(res,400,{ error:`Use una dirección web válida para ${name}` });
        links[name]=url.href;
      }
      state.socialLinks=links; persist();
      return send(res,200,{ socialLinks:links });
    }
    if (pathname === '/api/admin/import-local') {
      let stands = 0, requests = 0;
      for (const [rawKey, item] of Object.entries(body.inventory || {})) {
        const [sectorId, numberText] = rawKey.split(':');
        const number = Number(numberText);
        if (!validStand(sectorId,number) || !item || !['unassigned','available','reserved','sold','blocked'].includes(item.status)) continue;
        const key = standKey(sectorId,number);
        if (state.inventory[key]) continue;
        state.inventory[key] = { status:item.status,buyerName:clean(item.buyerName,100),
          organization:clean(item.organization,100),phone:clean(item.phone,40),
          notes:clean(item.notes,300),updatedAt:clean(item.updatedAt,40),legacyImport:true };
        stands++;
      }
      const existing = new Set(state.requests.map(row => row.id));
      for (const item of Array.isArray(body.requests) ? body.requests.slice(0,2000) : []) {
        const id=clean(item.id,40),sectorId=clean(item.sectorId,40),stand=Number(item.stand);
        const manzana=Number(item.manzana || /Manzana\s+(\d+)/i.exec(item.sectorName || '')?.[1] || /^MZ-(\d+)-L/i.exec(item.code || '')?.[1]);
        if (!id || existing.has(id) || !clean(item.name,100) || !clean(item.phone,40) ||
          !(validStand(sectorId,stand) || (!sectorId && Number.isSafeInteger(manzana) && manzana>0 && Number.isSafeInteger(stand) && stand>0))) continue;
        state.requests.push({ id,sectorId,stand,manzana:sectorId?null:manzana,
          name:clean(item.name,100),phone:clean(item.phone,40),organization:clean(item.organization,100),
          email:clean(item.email,120),notes:clean(item.notes,500),
          status:['new','contacted','closed'].includes(item.status)?item.status:'new',
          createdAt:clean(item.createdAt,40) || new Date().toISOString() });
        existing.add(id); requests++;
      }
      if (stands || requests) persist();
      return send(res,200,{ stands,requests });
    }
    if (pathname === '/api/admin/request-status') {
      const row=state.requests.find(item => item.id===body.id);
      if (!row || !['new','contacted','closed'].includes(body.status)) return send(res,400,{ error:'Solicitud o estado inválido' });
      row.status=body.status; persist(); return send(res,200,{ status:row.status });
    }
    if (pathname === '/api/admin/stand') {
      const sectorId=clean(body.sectorId,40), stand=Number(body.stand);
      if (!validStand(sectorId,stand)) return send(res,400,{ error:'Puesto inválido' });
      const key=standKey(sectorId,stand), prior=state.inventory[key] || { status:'unassigned' }, status=body.status;
      if (checkout.holder(key)) return send(res,409,{error:'Hay una compra en proceso. Revísela en Pagos y compras antes de cambiar esta ficha.'});
      if (!['unassigned','available','blocked','sold'].includes(status) && !(status==='reserved' && prior.status==='reserved')) return send(res,400,{ error:'Reservado requiere un código usado por el comprador' });
      if (status==='sold' && !['reserved','sold'].includes(prior.status)) return send(res,409,{ error:'Primero reserve con código' });
      if (!['sold','reserved'].includes(status)) revoke(key);
      const confirmed=['sold','reserved'].includes(status);
      const record={ status,buyerName:clean(body.buyerName,100),
        organization:clean(body.organization,100),
        phone:clean(body.phone,40),notes:clean(body.notes,300),
        paymentVerifiedAt:confirmed?prior.paymentVerifiedAt:'',reservedAt:confirmed?prior.reservedAt:'',
        updatedAt:new Date().toISOString() };
      if (status==='unassigned' && !record.buyerName && !record.organization && !record.phone && !record.notes) delete state.inventory[key];
      else state.inventory[key]=record;
      persist(); return send(res,200,{ record });
    }
    if (pathname === '/api/admin/issue-code') {
      const sectorId=clean(body.sectorId,40), stand=Number(body.stand);
      if (!validStand(sectorId,stand)) return send(res,400,{ error:'Puesto inválido' });
      const key=standKey(sectorId,stand);
      if (checkout.holder(key)) return send(res,409,{error:'Emita el código desde Pagos y compras para conservar el vínculo con el comprador.'});
      if (['reserved','sold','blocked'].includes(state.inventory[key]?.status)) return send(res,409,{ error:'El puesto no admite nuevo código' });
      const buyerName=clean(body.buyerName,100);
      if (!buyerName || body.paymentVerified !== true) return send(res,400,{ error:'Confirme el pago e indique el titular' });
      const requestId=clean(body.requestId,40);
      if (requestId && !state.requests.some(item => item.id===requestId && item.sectorId===sectorId && item.stand===stand)) return send(res,400,{ error:'La solicitud no corresponde al puesto' });
      revoke(key);
      const code=`FT-${crypto.randomBytes(5).toString('hex').toUpperCase()}`;
      const issuedAt=new Date().toISOString(), expiresAt=Date.now()+7*24*60*60*1000;
      state.codes.push({ id:crypto.randomUUID(),standKey:key,codeHash:hash(code),status:'issued',
        buyerName,organization:clean(body.organization,100),phone:clean(body.phone,40),
        requestId,issuedAt,expiresAt });
      if (requestId) { const row=state.requests.find(item => item.id===requestId); if (row) row.status='contacted'; }
      persist(); return send(res,201,{ code,issuedAt,expiresAt });
    }
    return send(res,404,{ error:'Ruta no encontrada' });
  } catch (error) {
    if (!res.headersSent) send(res,error.status || 500,{ error:error.status?error.message:'Error del servidor' });
    if (!error.status) console.error('FITROP API:', error.code || error.name);
  }
}
const checkout = require('./checkout-api')({state,persist,send,clean,hash,allow,validStand,standKey,permitted,stateFile:STATE_FILE,receipts:options.receipts});
return { handle, snapshot() {
  const now=Date.now();
  return {...state,_sessions:Object.fromEntries([...sessions].filter(([,expiry]) => expiry>now)),
    _attempts:Object.fromEntries([...attempts].filter(([,record]) => now-record.start<600000))};
} };
}
let localApi;
module.exports={createApi,handle(req,res,pathname) {
  localApi ||= createApi();
  return localApi.handle(req,res,pathname);
}};
