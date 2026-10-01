const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');

test('un código único reserva solo el puesto y titular verificados', async () => {
  const root = path.resolve(__dirname, '..');
  const dataFile = path.join(root, 'tmp', `reservation-test-${crypto.randomUUID()}.json`);
  const port = 7101 + Math.floor(Math.random() * 100);
  const base = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, ['dev-server.js', '--port', String(port)], {
    cwd: root, env: { ...process.env, FITROP_DATA_FILE:dataFile, FITROP_ADMIN_PASSWORD:'test-only-password' },
    windowsHide:true, stdio:['ignore','pipe','pipe']
  });
  let cookie = '';
  async function call(route, method = 'GET', body, authenticated = false) {
    const response = await fetch(`${base}${route}`, { method,
      headers: { ...(body ? { 'Content-Type':'application/json' } : {}), ...(authenticated ? { Cookie:cookie } : {}) },
      body:body ? JSON.stringify(body) : undefined });
    return { status:response.status, data:await response.json(), response };
  }
  try {
    let ready = false;
    for (let i = 0; i < 60; i++) {
      try { const response = await fetch(`${base}/api/inventory`); if (response.ok) { ready = true; break; } }
      catch (_) { await new Promise(resolve => setTimeout(resolve, 50)); }
    }
    assert.equal(ready, true, 'servidor de prueba disponible');
    assert.equal((await call('/api/admin/state')).status, 401);
    assert.deepEqual((await call('/api/social-links')).data.socialLinks,{});
    assert.equal((await call('/api/admin/social-links','POST',{facebook:'https://facebook.com/fitrop'})).status,401);
    const request = await call('/api/requests','POST', { sectorId:'piscicultura',stand:3,name:'Comprador de prueba',phone:'70000000' });
    assert.equal(request.status, 201);
    assert.equal((await call('/api/admin/login','POST',{ password:'wrong-code' })).status,401);
    const login = await call('/api/admin/login','POST',{ password:'test-only-password' });
    assert.equal(login.status, 200);
    cookie = login.response.headers.get('set-cookie').split(';')[0];
    assert.equal((await call('/api/admin/social-links','POST',{facebook:'javascript:alert(1)'},true)).status,400);
    assert.equal((await call('/api/admin/social-links','POST',{facebook:'https://facebook.com/fitrop',instagram:'https://instagram.com/fitrop'},true)).status,200);
    assert.equal((await call('/api/social-links')).data.socialLinks.facebook,'https://facebook.com/fitrop');
    const draft = await call('/api/admin/stand','POST',{sectorId:'piscicultura',stand:3,status:'unassigned',buyerName:'Comprador de prueba',phone:'70000000',notes:'Llamar al titular'},true);
    assert.equal(draft.status,200);
    assert.equal((await call('/api/admin/state','GET',null,true)).data.inventory['piscicultura:3'].phone,'70000000');
    assert.equal((await call('/api/inventory')).data.inventory['piscicultura:3'].buyerName,'');
    const noPayment = await call('/api/admin/issue-code','POST',{ sectorId:'piscicultura',stand:3,buyerName:'Comprador de prueba' },true);
    assert.equal(noPayment.status, 400);
    const issue = await call('/api/admin/issue-code','POST',{ sectorId:'piscicultura',stand:3,buyerName:'Comprador de prueba',phone:'70000000',requestId:request.data.id,paymentVerified:true },true);
    assert.equal(issue.status, 201);
    assert.match(issue.data.code,/^FT-[A-F0-9]{10}$/);
    const replacement = await call('/api/admin/issue-code','POST',{ sectorId:'piscicultura',stand:3,buyerName:'Comprador de prueba',phone:'70000000',requestId:request.data.id,paymentVerified:true },true);
    assert.equal(replacement.status, 201);
    assert.equal((await call('/api/redeem','POST',{sectorId:'piscicultura',stand:3,code:issue.data.code})).status,400);
    assert.equal((await call('/api/redeem','POST',{sectorId:'piscicultura',stand:4,code:replacement.data.code})).status,400);
    assert.equal((await call('/api/admin/stand','POST',{sectorId:'piscicultura',stand:4,status:'reserved'},true)).status,400);
    const redeemed = await call('/api/redeem','POST',{sectorId:'piscicultura',stand:3,code:replacement.data.code});
    assert.equal(redeemed.status,200);
    assert.equal(redeemed.data.buyerName,'Comprador de prueba');
    assert.notEqual((await call('/api/redeem','POST',{sectorId:'piscicultura',stand:3,code:replacement.data.code})).status,200);
    const publicState = await call('/api/inventory');
    assert.equal(publicState.data.inventory['piscicultura:3'].status,'reserved');
    assert.equal(publicState.data.inventory['piscicultura:3'].buyerName,'Comprador de prueba');
    assert.equal(publicState.data.inventory['piscicultura:3'].phone,undefined);
    const edited = await call('/api/admin/stand','POST',{sectorId:'piscicultura',stand:3,status:'reserved',buyerName:'Titular corregido',organization:'Cooperativa',phone:'71111111',notes:'Ficha corregida'},true);
    assert.equal(edited.status,200);
    assert.equal((await call('/api/inventory')).data.inventory['piscicultura:3'].buyerName,'Titular corregido');
    assert.equal((await call('/api/admin/state','GET',null,true)).data.requests[0].status,'closed');
    const imported = await call('/api/admin/import-local','POST',{inventory:{'apicultura:4':{status:'available'}},requests:[]},true);
    assert.equal(imported.status,200);
    assert.equal(imported.data.stands,1);
  } finally {
    child.kill();
    if (fs.existsSync(dataFile)) fs.unlinkSync(dataFile);
  }
});
