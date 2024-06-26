const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Caminho para o arquivo db.json original
const dbPath = path.join(__dirname, '..', 'db.json');

// Caminho para onde o db.json será copiado
const tempDbPath = path.join(os.tmpdir(), 'db.json');

// Verificar se o arquivo já foi copiado para evitar substituições repetidas
if (!fs.existsSync(tempDbPath)) {
  fs.copyFileSync(dbPath, tempDbPath);
}

const server = jsonServer.create();
const router = jsonServer.router(tempDbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);

// Middleware para garantir que o conteúdo do arquivo não seja sobrescrito
server.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    fs.copyFileSync(tempDbPath, tempDbPath + '.backup');
  }
  next();
});

// Restaura o backup em caso de falha
server.use((err, req, res, next) => {
  if (fs.existsSync(tempDbPath + '.backup')) {
    fs.copyFileSync(tempDbPath + '.backup', tempDbPath);
    fs.unlinkSync(tempDbPath + '.backup');
  }
  res.status(500).send('Internal Server Error');
});

module.exports = (req, res) => {
  server(req, res);
};
