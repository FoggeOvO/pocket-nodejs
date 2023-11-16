const express = require('express');
const router = express.Router();
const md5 = require('md5');
const AccountModel = require('../../models/AccountModel');
const UserModel = require('../../models/UserModel');
const moment = require('moment');

//导入中间件检测用户是否登陆
const checkLogin = require('../../middlewares/checkLoginMiddleware');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('auth/login');
});


router.get('/reg', function (req, res, next) {
  res.render('auth/reg');
});

router.post('/reg', function (req, res, next) {
  let {password} = req.body;
  UserModel.create({...req.body,password:md5(password)})
  .then(() => {
    res.render('success', { title: '注册成功', url: '/' });
  })
  .catch(() => {
    res.render('error', { title: '注册失败', url: '/reg' });
  });
});

router.post('/login', function (req, res, next) {
  let {username,password} = req.body;
  console.log(username,password);
  UserModel.findOne({username:username,password:md5(password)})
  .then((data) => {
    if(!data){
      res.send('账号或密码错误');
    }else{

      //登陆成功后，将用户信息存储到session中
      req.session.username = data.username;
      req.session.id=data._id;

      //登陆成功响应
      res.render('success',{title:'登陆成功',url:'account'} );
    }
  })
  .catch((err) => {
    res.status(500).send('登陆异常,请稍后再试~');
  });
});

router.get('/account', checkLogin,function (req, res, next) {
  AccountModel.find().sort({ time: 1 }).exec().then(data => {
    res.render('account', { account: data ,moment: moment});
  }).catch(err => {
    res.status(500).send(err);
  });
});

router.get('/account/create',checkLogin, function (req, res, next) {
  res.render('create');
});

router.post('/logout',checkLogin, function (req, res, next) {
  req.session.destroy(()=>{
    res.render('success',{title:'退出成功',url:'/'});
  });
});


module.exports = router;
