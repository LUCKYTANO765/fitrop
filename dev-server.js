// Servidor estático local para el proyecto (preview en localhost).
// Uso: node server.js --host 0.0.0.0 --port 7100
const http = require('http');
const fs = require('fs');
const path = require('path');
const standsApi = require('./lib/stands-api');

function parseArgs(argv) {
  const args = { host: '127.0.0.1', port: parseInt(process.env.PORT, 10) || 7100 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--host' || a === '-H') { args.host = argv[++i]; }
    else if (a.startsWith('--host=')) { args.host = a.slice(7); }
    else if (a === '--port' || a === '-p') { args.port = parseInt(argv[++i], 10) || args.port; }
    else if (a.startsWith('--port=')) { args.port = parseInt(a.slice(7), 10) || args.port; }
  }
  return args;
}

const { host, port } = parseArgs(process.argv.slice(2));
if (!['127.0.0.1', 'localhost', '::1'].includes(host) && !process.env.FITROP_ADMIN_PASSWORD) {
  throw new Error('Configure FITROP_ADMIN_PASSWORD antes de exponer el servidor.');
}
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (urlPath.startsWith('/api/')) { standsApi.handle(req, res, urlPath); return; }
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end('Method not allowed'); return; }
    if (urlPath === '/') urlPath = '/index.html';
    const filePath = path.resolve(ROOT, `.${urlPath}`);
    const relative = path.relative(ROOT, filePath);
    if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(part => ['data','lib','scratch','tmp','tests','artifacts'].includes(part) || part.startsWith('.')) || !MIME[path.extname(filePath).toLowerCase()]) { res.writeHead(403); res.end('Forbidden'); return; }
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(404); res.end('Not found'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
      if (req.method === 'HEAD') res.end(); else res.end(data);
    });
  } catch (e) {
    res.writeHead(500); res.end('Error');
  }
});

server.listen(port, host, () => {
  console.log(`Servidor listo en http://${host}:${port}/`);
});
