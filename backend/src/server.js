const express = require('express');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8080;

const db = require('./config/db/index');
const route = require('./routes');

//db
db.connect();

app.use(cors());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

// app.use(methodOverride('_method'));

// http logger
// app.use(morgan('combined'));

app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    // helpers: require('')
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
