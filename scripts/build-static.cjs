const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
if (path.resolve(output)!==path.join(root,'dist') || !output.startsWith(root+path.sep)) throw new Error('Directorio de salida inválido');
fs.rmSync(output,{recursive:true,force:true});
fs.mkdirSync(output, {recursive:true});
// An allowlist prevents credentials, receipts and server sources from being public.
const entries = ['index.html','espacios.html','gestion-puestos.html','mapa_cochabamba.html','css','js','assets'];
for (const entry of entries) fs.cpSync(path.join(root,entry),path.join(output,entry),{recursive:true});
console.log('FITROP: páginas, estilos, scripts y recursos preparados.');
