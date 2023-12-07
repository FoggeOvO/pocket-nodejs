var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/web/index');
const accountRouter = require('./routes/api/account');
const tokenRouter = require('./routes/api/token.js');
const authRouter = require('./routes/web/auth');
const userRouter = require('./routes/api/hrm/hrm.js');
const depRouter = require('./routes/api/dep/dep.js');
const sysRouter = require('./routes/api/hrm/columns.js');

//导入express-session模块
const session = require('express-session');
const MongoStore = require('connect-mongo');
//导入config模块
const {dburl,dbPort,dbName} = require('./config/config.js');
const { render } = require('ejs');
const cors = require('cors');

var app = express();

//设置session中间件
app.use(session({
  name:'sid',//设置cookie的name，默认值是：connect.sid
  secret:'lvlvbaby',//参与加密的字符串（又称签名）
  saveUninitialized:false,//是否为每次请求都设置一个cookie用来存储session的id
  resave:true,//是否在每次请求时重新保存session
  store:MongoStore.create({
    mongoUrl:`mongodb://${dburl}:${dbPort}/${dbName}`
  }),
  cookie:{
    httpOnly:true,//开启后前端无法通过JS操作cookie
    maxAge:1000*60*60*24
  }//设置有效期，单位是毫秒
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());//解决跨域问题
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api', accountRouter);
app.use('/auth', tokenRouter);
app.use('/api/user', userRouter);
app.use('/api/sys', sysRouter);
app.use('/api/dep', depRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404');
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
