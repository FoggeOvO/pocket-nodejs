const express = require('express');
const router = express.Router();
const UserModel = require('../../../models/UserModel');

//导入中间件检测用户是否登陆
const checkToken = require('../../../middlewares/checkTokenMiddleware');

router.get('/getusers',checkToken,function (req, res, next) {
    UserModel.find({"isdel":0},{lastname:1,workcode:1,hiredate:1,posion:1,level:1,gender:1,_id:0}).then((data) => {
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