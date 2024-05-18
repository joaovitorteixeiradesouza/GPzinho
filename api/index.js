const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

// Caminho para o arquivo db.json original
const dbPath = path.join(__dirname, '..', 'db.json');

// Caminho para onde o db.json será copiado
const tempDbPath = '/tmp/db.json';

// Copiar db.json para o diretório /tmp na inicialização
fs.copyFileSync(dbPath, tempDbPath);

const server = jsonServer.create();
const router = jsonServer.router(tempDbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use('/api', router);

server.use((req, res) => {
  res.status(404).send('Not Found');
});

module.exports = (req, res) => {
  server(req, res);
};
