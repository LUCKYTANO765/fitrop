const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {spawn}=require('node:child_process');

test('compra sin cuenta: QR, comprobante privado, revisión manual y puesto exclusivo',async()=>{
  const root=path.resolve(__dirname,'..'),tmp=path.join(root,'tmp');
  const dataFile=path.join(tmp,`checkout-test-${crypto.randomUUID()}.json`),port=7300+Math.floor(Math.random()*100);
  const base=`http://127.0.0.1:${port}`,token=crypto.randomBytes(32).toString('hex'),otherToken=crypto.randomBytes(32).toString('hex');
  const image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII=';
  fs.mkdirSync(tmp,{recursive:true});
  fs.writeFileSync(dataFile,JSON.stringify({inventory:{'piscicultura:3':{status:'available'},'piscicultura:4':{status:'available'},'piscicultura:5':{status:'available'}},orders:[{id:'EXPIRED-TEST',accessHash:'old',sectorId:'piscicultura',stand:4,status:'awaiting_payment',expiresAt:Date.now()-1}]}));
  let child,cookie='';
  async function boot(){child=spawn(process.execPath,['dev-server.js','--port',String(port)],{cwd:root,env:{...process.env,FITROP_DATA_FILE:dataFile,FITROP_ADMIN_PASSWORD:'checkout-test-password'},windowsHide:true,stdio:'ignore'});for(let n=0;n<70;n++){try{if((await fetch(`${base}/api/payment`)).ok)return;}catch(_){}await new Promise(r=>setTimeout(r,50));}throw new Error('No inició el servidor de prueba');}
  async function call(route,body,auth=false){const response=await fetch(base+route,{method:body?'POST':'GET',headers:{...(body?{'Content-Type':'application/json'}:{}),...(auth?{Cookie:cookie}:{})},body:body?JSON.stringify(body):undefined});const data=await response.json();return {status:response.status,data,response};}
  async function login(){const result=await call('/api/admin/login',{password:'checkout-test-password'});assert.equal(result.status,200);cookie=result.response.headers.get('set-cookie').split(';')[0];}
  async function stop(){if(child?.exitCode===null)await new Promise(resolve=>{child.once('exit',resolve);child.kill();});}
  try{
    await boot();
    assert.equal((await call('/api/payment')).data.enabled,false);
    assert.equal((await call('/api/orders/start',{token,sectorId:'piscicultura',stand:3,name:'Prueba',phone:'70000000'})).status,409);
    assert.equal((await call('/api/admin/payment',{holder:'Prueba',enabled:true,qrData:image})).status,401);
    await login();
    assert.equal((await call('/api/admin/payment',{enabled:true,testMode:true},true)).status,200,'activa modo de prueba sin QR');
    assert.deepEqual(((await call('/api/payment')).data),{enabled:true,holder:'FITROP 2026 · modo de prueba',whatsapp:'',hasQr:false,testMode:true});
    assert.equal((await fetch(base+'/api/payment/qr')).status,404,'no inventa ni muestra un QR');
    const testToken=crypto.randomBytes(32).toString('hex');
    const testOrder=await call('/api/orders/start',{token:testToken,sectorId:'piscicultura',stand:5,name:'Comprador de prueba',phone:'70000002'});
    assert.equal(testOrder.status,201,'permite recorrer la compra sin QR');
    assert.equal((await call('/api/orders/proof',{token:testToken,image})).data.order.status,'pending_review','el comprobante queda pendiente para revisión manual');
    assert.equal((await call('/api/admin/orders/review',{id:testOrder.data.order.id,action:'approve'},true)).status,400,'no confirma sin revisión explícita');
    const testApproval=await call('/api/admin/orders/review',{id:testOrder.data.order.id,action:'approve',paymentVerified:true},true);
    assert.equal(testApproval.status,200,'el administrador aprueba manualmente');
    assert.equal((await call('/api/redeem',{code:testApproval.data.code})).data.buyerName,'Comprador de prueba','el comprador confirma con el código entregado');
    assert.equal((await call('/api/admin/payment',{holder:'Prueba',whatsapp:'59170000000',enabled:true,qrData:'data:image/svg+xml;base64,AA=='},true)).status,400);
    assert.equal((await call('/api/admin/payment',{holder:'Titular de pruebas',whatsapp:'59170000000',enabled:true,qrData:image},true)).status,200);
    assert.equal((await fetch(base+'/api/payment/qr')).status,200);
    assert.equal((await call('/api/payment')).data.qrData,undefined);
    assert.equal((await call('/api/orders/start',{token:otherToken,sectorId:'apicultura',stand:1,name:'Prueba',phone:'70000000'})).status,409,'no vende puestos por confirmar');
    const started=await call('/api/orders/start',{token,sectorId:'piscicultura',stand:3,name:'Comprador de prueba',phone:'70000000'});
    assert.equal(started.status,201);const id=started.data.order.id;
    assert.equal((await call('/api/orders/start',{token,sectorId:'piscicultura',stand:3,name:'Prueba',phone:'70000000'})).data.order.id,id,'reintento no duplica compra');
    assert.equal((await call('/api/orders/start',{token:otherToken,sectorId:'piscicultura',stand:3,name:'Otra persona',phone:'70000001'})).status,409,'exclusividad antes del pago');
    assert.equal((await call('/api/inventory')).data.inventory['piscicultura:3'].status,'pending');
    assert.equal((await call('/api/inventory')).data.inventory['piscicultura:3'].buyerName,'');
    assert.equal((await call('/api/orders/status',{token:otherToken})).status,404);
    assert.equal((await call('/api/admin/orders/review',{id,action:'approve',paymentVerified:true},true)).status,400,'no aprueba sin comprobante');
    assert.equal((await call('/api/orders/proof',{token,image:'data:image/png;base64,aGVsbG8='})).status,400);
    assert.equal((await call('/api/orders/proof',{token,image})).data.order.status,'pending_review');
    assert.equal((await call('/api/orders/cancel',{token})).status,409,'no libera un puesto con pago en revisión');
    assert.equal((await fetch(base+`/api/admin/order-proof/${id}`)).status,401,'comprobante privado');
    assert.equal((await fetch(base+`/api/admin/order-proof/${id}`,{headers:{Cookie:cookie}})).status,200);
    assert.equal((await call('/api/admin/orders/review',{id,action:'approve',paymentVerified:true})).status,401);
    assert.equal((await call('/api/admin/orders/review',{id,action:'approve'},true)).status,400);
    assert.equal((await call('/api/admin/orders/review',{id,action:'correction',note:'Necesitamos ver el destinatario.'},true)).data.order.status,'correction');
    assert.equal((await call('/api/orders/proof',{token,image})).data.order.status,'pending_review');
    assert.equal((await call('/api/admin/stand',{sectorId:'piscicultura',stand:3,status:'blocked'},true)).status,409);
    assert.equal((await call('/api/admin/issue-code',{sectorId:'piscicultura',stand:3,buyerName:'Otra persona',paymentVerified:true},true)).status,409);
    const approved=await call('/api/admin/orders/review',{id,action:'approve',paymentVerified:true},true);
    assert.equal(approved.status,200);assert.match(approved.data.code,/^FT-[A-F0-9]{10}$/);
    assert.equal((await call('/api/orders/status',{token})).data.order.status,'approved');
    assert.equal((await call('/api/redeem',{code:approved.data.code,sectorId:'piscicultura',stand:4})).status,400);
    await stop();await boot();await login();
    assert.equal((await call('/api/orders/status',{token})).data.order.status,'approved','persistencia tras reinicio');
    assert.equal((await fetch(base+`/api/admin/order-proof/${id}`,{headers:{Cookie:cookie}})).status,200);
    const confirmed=await call('/api/redeem',{code:approved.data.code});
    assert.equal(confirmed.status,200);assert.equal(confirmed.data.stand,3);assert.equal(confirmed.data.buyerName,'Comprador de prueba');
    assert.equal((await call('/api/orders/status',{token})).data.order.status,'confirmed');
    assert.equal((await call('/api/inventory')).data.inventory['piscicultura:3'].status,'reserved');
    assert.notEqual((await call('/api/redeem',{code:approved.data.code})).status,200,'no reutiliza código');
    const second=await call('/api/orders/start',{token:otherToken,sectorId:'piscicultura',stand:4,name:'Otra persona',phone:'70000001'});
    assert.equal(second.status,201,'libera plazos vencidos');
    assert.equal((await call('/api/admin/orders/review',{id:second.data.order.id,action:'cancel',note:'Cancelada por el comprador.'},true)).data.order.status,'cancelled');
    assert.equal((await call('/api/inventory')).data.inventory['piscicultura:4'].status,'available');
    const thirdToken=crypto.randomBytes(32).toString('hex');
    assert.equal((await call('/api/orders/start',{token:thirdToken,sectorId:'piscicultura',stand:4,name:'Prueba de cambio',phone:'70000001'})).status,201);
    assert.equal((await call('/api/orders/cancel',{token:thirdToken})).data.order.status,'cancelled');
    assert.equal((await call('/api/admin/open-sector',{sectorId:'apicultura'})).status,401);
    assert.equal((await call('/api/admin/open-sector',{sectorId:'apicultura'},true)).data.changed,19);
    assert.equal((await call('/api/inventory')).data.inventory['apicultura:1'].status,'available');
  }finally{
    await stop();
    assert.ok(path.resolve(dataFile).startsWith(path.resolve(tmp)+path.sep));
    if(fs.existsSync(dataFile))fs.unlinkSync(dataFile);
    if(fs.existsSync(`${dataFile}.receipts`))fs.rmSync(`${dataFile}.receipts`,{recursive:true});
  }
});
