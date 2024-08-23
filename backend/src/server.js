const express = require('express');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// .env
require('dotenv').config();

// middleware
const SortMiddleware = require('./app/middlewares/SortMiddleware');
// const CheckToken = require('./app/middlewares/auth');

const app = express();
const port = 8080;

const db = require('./config/db/index');
const route = require('./routes');

//db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(methodOverride('_method'));

app.use(cors());
app.use(cookieParser());

// custom middleware
app.use(SortMiddleware);
// app.use(CheckToken);

// http logger
// app.use(morgan('combined'));

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: require('./helpers/handlebars'),
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
