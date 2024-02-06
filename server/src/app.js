const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const https = require('https');
const { login, user, project } = require('./routes/index.js');

const app = express();

const corsOptions = {
  origin: process.env.CORS_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const certPath = 'src/ssl/code.crt';
const keyPath = 'src/ssl/code.key';

// Verifica a existência dos arquivos de certificado e chave
if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
  console.error('Erro: Arquivos de certificado ou chave não encontrados.');
  process.exit(1);
}

// Lê os arquivos de certificado e chave
const cert = fs.readFileSync(certPath);
const key = fs.readFileSync(keyPath);

const serverOptions = {
  cert,
  key,
  // Configurações de segurança adicionais podem ser adicionadas aqui
};

https
  .createServer(serverOptions, app)
  .listen(process.env.API_PORT_HTTPS, () =>
    console.log('Servidor HTTPS rodando na porta', process.env.API_PORT_HTTPS)
  )
  .on('error', (err) => {
    console.error('Erro ao iniciar o servidor HTTPS:', err.message);
    process.exit(1);
  });

app.use('/login', login);
app.use('/user', user);
app.use('/project', project);
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'public', 'uploads'))
);

module.exports = app;
