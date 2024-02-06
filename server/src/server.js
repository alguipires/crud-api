require('dotenv').config();

const app = require('./app');

const port = process.env.API_PORT;
// const port = process.env.API_PORT_HTTPS;

app.listen(port, () => {
  console.log('Servidor escutando na porta', port);
});
