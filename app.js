var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./commonFunc'); //汎用的に使うグローバル関数
require('./globalVar'); //将棋関連を定義したグローバル変数
require('./globalFunc'); //将棋関連を定義したグローバル関数

var indexRouter = require('./routes/index'); //タイトル用
var topRouter = require('./routes/top'); //メニュー画面用
var registerRouter = require('./routes/register'); //初回登録用
var loginRouter = require('./routes/login'); //ログイン用
var usersRouter = require('./routes/users');
var battleRouter = require('./routes/battle');
var matchingRouter = require('./routes/matching');
var debugRouter = require('./routes/debug'); // 動作テスト用
var planetRouter = require('./routes/planet'); // 動作テスト用

var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session設定
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30 // 一ヶ月
  }
}));

// セッションに情報が無ければログイン画面にリダイレクト
var sessionCheck = function(req, res, next) {
  if (req.session.own) {
    next();
  } else {
    next();

    // res.redirect('/login');
  }
};
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/', sessionCheck, indexRouter);
app.use('/top', topRouter);
app.use('/users', usersRouter);
app.use('/battle', battleRouter);
app.use('/matching', matchingRouter);
app.use('/debug', debugRouter);
app.use('/planet', planetRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
