const { Pool } = require('pg');
let pool;
function database() {
  let connectionString=process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) throw new Error('Database not configured');
  const url=new URL(connectionString);
  if (['prefer','require','verify-ca'].includes(url.searchParams.get('sslmode'))) {
    url.searchParams.set('sslmode','verify-full');
    connectionString=url.href;
  }
  return pool ||= new Pool({connectionString,max:2,connectionTimeoutMillis:15000,idleTimeoutMillis:10000});
}
async function schema(client) {
  await client.query('CREATE TABLE IF NOT EXISTS fitrop_state (id text PRIMARY KEY, payload jsonb NOT NULL, admin_auth jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now())');
  await client.query('CREATE TABLE IF NOT EXISTS fitrop_receipts (name text PRIMARY KEY, content bytea NOT NULL)');
}
async function transaction(callback,key='production') {
  const client=await database().connect();
  try {
    await client.query('BEGIN');
    // Lock the inventory for the entire operation: concurrent buyers cannot acquire the same stand.
    const result=await client.query('SELECT payload, admin_auth FROM fitrop_state WHERE id=$1 FOR UPDATE',[key]);
    if (!result.rows.length) throw new Error('Database not initialized');
    const row=result.rows[0];
    const receipts={async read(name) {
      const result=await client.query('SELECT content FROM fitrop_receipts WHERE name=$1',[name]);
      if(!result.rows.length)throw new Error('Receipt missing');
      return result.rows[0].content;
    },async write(name,bytes) {
      await client.query('INSERT INTO fitrop_receipts (name,content) VALUES ($1,$2) ON CONFLICT (name) DO UPDATE SET content=EXCLUDED.content',[name,bytes]);
    }};
    const next=await callback(row.payload,row.admin_auth,receipts);
    await client.query('UPDATE fitrop_state SET payload=$1::jsonb, updated_at=now() WHERE id=$2',[JSON.stringify(next),key]);
    await client.query('COMMIT');
  } catch(error) {
    await client.query('ROLLBACK').catch(()=>{});
    throw error;
  } finally { client.release(); }
}
module.exports={database,schema,transaction};
