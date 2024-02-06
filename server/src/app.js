const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const https = require('https');
const { login, user, project } = require('./routes/index.js');
const { Console } = require('console');

const app = express();

const corsOptions = {
  origin: process.env.CORS_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

https
  .createServer(
    {
      cert: fs.readFileSync('src/ssl/code.crt'),
      key: fs.readFileSync('src/ssl/code.key'),
    },
    app
  )
  .listen(process.env.API_PORT_HTTPS, () =>
    console.log('rodando em https PORT ', process.env.API_PORT_HTTPS)
  );

app.use('/login', login);
app.use('/user', user);
app.use('/project', project);
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'public', 'uploads'))
);

module.exports = app;
