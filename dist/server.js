"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _appjs = require('./app.js'); var _appjs2 = _interopRequireDefault(_appjs);

_appjs2.default.listen(process.env.APP_PORT, () => {
  console.log();
  console.log(`Servidor escutando na porta ${process.env.APP_PORT}`);
  console.log(`Acesse em http://localhost:${process.env.APP_PORT}`);
});
