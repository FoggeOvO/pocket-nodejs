const express = require('express');
const router = express.Router();
const DepModel = require('../../../models/DepModel');

//导入中间件检测用户是否登陆
const checkToken = require('../../../middlewares/checkTokenMiddleware');

router.get('/getdep',checkToken,function (req, res, next) {
    DepModel.find({"visable":true},{depname:1,depid:1,parent:1,_id:0}).then((data) => {
        console.log(data)
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