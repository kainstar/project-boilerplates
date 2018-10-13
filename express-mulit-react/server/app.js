const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');

const app = express();

const isDev = process.env.NODE_ENV === 'development';
const staticDir = path.join(__dirname, isDev ? '../static' : '../public');

app.use(favicon(path.join(staticDir, 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(staticDir));

app.use('/api', require('./routes/api'));

app.use(
  history({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json(res.locals);
});

module.exports = app;
