const express = require('express');
const router = express.Router();
const UserModel = require('../../../models/UserModel');

//导入中间件检测用户是否登陆
const checkToken = require('../../../middlewares/checkTokenMiddleware');
const checkLogin = require('../../../middlewares/checkLoginMiddleware');

router.get('/getusers',checkToken,function (req, res, next) {
    UserModel.find().then((data) => {
      console.log('@',req.session)
      if(!data){
        res.json({
            code: '3001',
            msg: '数据为空'
          });
      }else{
        res.json({
            code: '0000',
            msg: 'success',
            data: data
          });
      }
    })
    .catch((err) => {
      res.status(500).send('获取数据异常,请稍后再试~');
    });

  });

  module.exports = router;