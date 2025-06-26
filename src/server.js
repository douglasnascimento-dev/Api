import app from './app.js';

app.listen(process.env.APP_PORT, () => {
  console.log();
  console.log(`Servidor escutando na porta ${process.env.APP_PORT}`);
  console.log(`Acesse em http://localhost:${process.env.APP_PORT}`);
});
