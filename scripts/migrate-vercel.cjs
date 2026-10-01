const fs=require('node:fs');
const path=require('node:path');
const {database,schema}=require('../lib/vercel-store');
const root=path.resolve(__dirname,'..');
async function migrate() {
  const file=process.env.FITROP_DATA_FILE || path.join(root,'data','stand-state.json');
  const authFile=process.env.FITROP_DATA_FILE ? `${file}.auth` : path.join(root,'data','admin-auth.json');
  const state=JSON.parse(fs.readFileSync(file,'utf8'));
  const auth=JSON.parse(fs.readFileSync(authFile,'utf8'));
  if (!auth.salt || !/^[a-f0-9]{128}$/.test(auth.digest)) throw new Error('Credencial inválida');
  const proofs={};
  for (const order of state.orders || []) {
    if (!order.proofFile) continue;
    if (path.basename(order.proofFile)!==order.proofFile) throw new Error('Ruta de comprobante inválida');
    proofs[order.proofFile]=fs.readFileSync(path.join(`${file}.receipts`,order.proofFile));
  }
  const client=await database().connect();
  try {
    await schema(client);
    await client.query('BEGIN');
    const inserted=await client.query("INSERT INTO fitrop_state (id,payload,admin_auth) VALUES ('production',$1::jsonb,$2::jsonb) ON CONFLICT (id) DO NOTHING RETURNING id",[JSON.stringify(state),JSON.stringify(auth)]);
    if (!inserted.rowCount) {
      await client.query('ROLLBACK');
      console.log('La base ya contiene datos. Se conservan íntegramente; no se sobrescriben.');
      return;
    }
    for(const [name,bytes] of Object.entries(proofs)) await client.query('INSERT INTO fitrop_receipts (name,content) VALUES ($1,$2)',[name,bytes]);
    await client.query('COMMIT');
    console.log(`Migración completada: ${Object.keys(state.inventory || {}).length} puestos, ${(state.orders || []).length} compras, ${Object.keys(proofs).length} comprobantes. Credencial original conservada.`);
  } catch(error) {await client.query('ROLLBACK').catch(()=>{});throw error;} finally {client.release();}
}
migrate().catch(error=>{console.error('No se completó la migración:',error.code || error.name);process.exitCode=1;}).finally(async()=>{await database().end();});
