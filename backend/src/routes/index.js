const siteRouter = require('./site');
const newsRouter = require('./news');
const loginRouter = require('./login');
const registerRouter = require('./register');

function route(app) {
  app.use('/', siteRouter);
  app.use('/news', newsRouter);
  app.use('/', loginRouter);
  app.use('/', registerRouter);
}

module.exports = route;
