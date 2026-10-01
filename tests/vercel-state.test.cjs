const {test}=require('node:test');
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {createApi}=require('../lib/stands-api');

test('sesión, comprobante y confirmación manual sobreviven a distintas instancias',async()=>{
  const isolated=fs.mkdtempSync(path.join(os.tmpdir(),'fitrop-vercel-test-'));
  const prior=process.env.FITROP_DATA_FILE;
  process.env.FITROP_DATA_FILE=path.join(isolated,'state.json');
  const password='isolated-vercel-test';
  const auth={salt:'isolated-test',digest:crypto.scryptSync(password,'isolated-test',64).toString('hex')};
  let state={inventory:{'piscicultura:1':{status:'available'}},requests:[],codes:[],orders:[],socialLinks:{},paymentSettings:{enabled:true,testMode:true},_proofs:{}};
  let cookie='';
  async function call(url,body,admin=false) {
    // Every call gets a new API instance, as happens across Vercel function workers.
    const snapshot=structuredClone(state);
    const receipts={read:name=>Buffer.from(snapshot._proofs[name],'base64'),write:(name,bytes)=>snapshot._proofs[name]=bytes.toString('base64')};
    const api=createApi({state:snapshot,auth,receipts});
    const res={headersSent:false,writeHead(status,headers){this.status=status;this.headers=headers;this.headersSent=true;},end(data){this.body=data;}};
    await api.handle({method:body?'POST':'GET',headers:{host:'test.invalid',...(admin?{cookie}:{})},socket:{remoteAddress:'127.0.0.1'},body},res,url);
    state=api.snapshot();
    return {...res,data:Buffer.isBuffer(res.body)?null:JSON.parse(res.body)};
  }
  try {
    const login=await call('/api/admin/login',{password});
    assert.equal(login.status,200);cookie=login.headers['Set-Cookie'].split(';')[0];
    assert.equal((await call('/api/admin/session',undefined,true)).data.authenticated,true);
    const token=crypto.randomBytes(32).toString('hex');
    const started=await call('/api/orders/start',{token,sectorId:'piscicultura',stand:1,name:'Prueba aislada',phone:'70000000'});
    assert.equal(started.status,201);
    const image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jD1sAAAAASUVORK5CYII=';
    assert.equal((await call('/api/orders/proof',{token,image})).data.order.status,'pending_review');
    assert.equal((await call('/api/admin/orders/review',{id:started.data.order.id,action:'approve'},true)).status,400);
    assert.equal(state.orders[0].status,'pending_review','no verifica pagos automáticamente');
    const proof=await call(`/api/admin/order-proof/${started.data.order.id}`,undefined,true);
    assert.equal(proof.status,200);assert.deepEqual(proof.body,Buffer.from(image.split(',')[1],'base64'));
    assert.equal((await call(`/api/admin/order-proof/${started.data.order.id}`)).status,401);
    const approved=await call('/api/admin/orders/review',{id:started.data.order.id,action:'approve',paymentVerified:true},true);
    assert.equal(approved.status,200);
    assert.equal((await call('/api/redeem',{code:approved.data.code})).status,200);
    assert.equal((await call('/api/inventory')).data.inventory['piscicultura:1'].status,'reserved');
    assert.notEqual((await call('/api/redeem',{code:approved.data.code})).status,200);
    await call('/api/admin/logout',{},true);
    assert.equal((await call('/api/admin/session',undefined,true)).data.authenticated,false);
  } finally {
    if(prior===undefined)delete process.env.FITROP_DATA_FILE;else process.env.FITROP_DATA_FILE=prior;
    fs.rmdirSync(isolated);
  }
});
