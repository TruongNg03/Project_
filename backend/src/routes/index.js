const siteRouter = require('./site');
const activityRouter = require('./activity');
const authRouter = require('./auth');
const userRouter = require('./user');
const bloodRouter = require('./blood');
const hospitalRouter = require('./hospital');
const meRouter = require('./me');

function route(app) {
  app.use('/', siteRouter);
  app.use('/activities', activityRouter);
  app.use('/bloods', bloodRouter);
  app.use('/hospital', hospitalRouter);
  //
  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  //
  app.use('/me', meRouter);
}

module.exports = route;
