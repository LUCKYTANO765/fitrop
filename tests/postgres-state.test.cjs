const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
const crypto=require('node:crypto');
const {createApi}=require('../lib/stands-api');
const {database,transaction}=require('../lib/vercel-store');

test('Postgres conserva sesiones, serializa compradores y revierte operaciones fallidas',{
  skip:!process.env.FITROP_RUN_DB_TESTS
},async()=>{
  const isolated=fs.mkdtempSync(path.join(os.tmpdir(),'fitrop-postgres-test-'));
  const prior=process.env.FITROP_DATA_FILE;
  process.env.FITROP_DATA_FILE=path.join(isolated,'state.json');
  const key=`test-${crypto.randomUUID()}`;
  const password='postgres-isolated-test';
  const auth={salt:key,digest:crypto.scryptSync(password,key,64).toString('hex')};
  const state={inventory:{'piscicultura:1':{status:'available'}},requests:[],codes:[],orders:[],socialLinks:{},paymentSettings:{enabled:true,testMode:true}};
  fs.writeFileSync(process.env.FITROP_DATA_FILE,JSON.stringify(state));
  const pool=database();
  const filename=`${key}.image`;
  try {
    await pool.query('INSERT INTO fitrop_state (id,payload,admin_auth) VALUES ($1,$2,$3)',[key,JSON.stringify(state),JSON.stringify(auth)]);
    async function call(route,body,headers={}) {
      let response;
      await transaction(async(state,auth,receipts)=>{
        const api=createApi({state,auth,receipts});
        const res={headersSent:false,writeHead(status,headers){this.status=status;this.headers=headers;this.headersSent=true;},end(body){this.body=body;}};
        await api.handle({method:body?'POST':'GET',headers:{host:'test.invalid',...headers},socket:{remoteAddress:'127.0.0.1'},body},res,route);
        response={...res,data:JSON.parse(res.body)};
        return api.snapshot();
      },key);
      return response;
    }
    const login=await call('/api/admin/login',{password});
    assert.equal(login.status,200);
    const cookie=login.headers['Set-Cookie'].split(';')[0];
    assert.equal((await call('/api/admin/session',undefined,{cookie})).data.authenticated,true);
    const results=await Promise.all([1,2].map(i=>call('/api/orders/start',{token:crypto.randomBytes(32).toString('hex'),sectorId:'piscicultura',stand:1,name:`Prueba ${i}`,phone:'70000000'})));
    assert.deepEqual(results.map(result=>result.status).sort(),[201,409],'solo un comprador adquiere el puesto');
    await transaction(async(state,auth,receipts)=>{
      await receipts.write(filename,Buffer.from('isolated receipt'));
      return state;
    },key);
    await transaction(async(state,auth,receipts)=>{
      assert.equal((await receipts.read(filename)).toString(),'isolated receipt');
      return state;
    },key);
    await assert.rejects(transaction(async(state,auth,receipts)=>{
      state.inventory['piscicultura:1'].buyerName='Must rollback';
      await receipts.write(filename,Buffer.from('Must rollback'));
      await pool.query('SELECT 1');
      throw new Error('Isolated failure');
    },key));
    await transaction(async(state,auth,receipts)=>{
      assert.equal(state.inventory['piscicultura:1'].buyerName,undefined);
      assert.equal((await receipts.read(filename)).toString(),'isolated receipt');
      return state;
    },key);
  } finally {
    await pool.query('DELETE FROM fitrop_receipts WHERE name=$1',[filename]);
    await pool.query('DELETE FROM fitrop_state WHERE id=$1',[key]);
    await pool.end();
    if(prior===undefined)delete process.env.FITROP_DATA_FILE;else process.env.FITROP_DATA_FILE=prior;
    fs.unlinkSync(path.join(isolated,'state.json'));fs.rmdirSync(isolated);
  }
});
