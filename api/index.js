const { createApi } = require('../lib/stands-api');
const { transaction } = require('../lib/vercel-store');

// Send success only after the transaction is durably committed.
function bufferedResponse() {
  return {status:200,headers:{},chunks:[],headersSent:false,
    writeHead(status,headers={}) { this.status=status;this.headers=headers;this.headersSent=true; },
    end(body) { if (body !== undefined) this.chunks.push(Buffer.isBuffer(body)?body:Buffer.from(String(body))); }
  };
}
module.exports = async function handler(req,res) {
  const pathname=new URL(req.url,'https://fitrop.invalid').pathname;
  const response=bufferedResponse();
  try {
    await transaction(async (state,auth,receipts) => {
      const api=createApi({state,auth,receipts});
      await api.handle(req,response,pathname);
      if (response.status >= 500) throw new Error('Operation failed');
      return api.snapshot();
    });
    res.writeHead(response.status,response.headers);
    res.end(Buffer.concat(response.chunks));
  } catch(error) {
    // Never expose connection strings, credentials, SQL parameters or purchaser data.
    console.error('FITROP storage unavailable:',error.code || error.name);
    res.writeHead(503,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
    res.end(JSON.stringify({error:'No se pudo conectar con la gestión de puestos. Intente nuevamente en unos momentos.'}));
  }
};
