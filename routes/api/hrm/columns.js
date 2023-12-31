const express = require('express');
const router = express.Router();
const ColumnModel = require('../../../models/ColumnModel');

//导入中间件检测用户是否登陆
const checkToken = require('../../../middlewares/checkTokenMiddleware');

router.get('/getcolumns',checkToken,function (req, res, next) {
    ColumnModel.find({visable:true},{dataIndex:1,key:1,title:1,_id:1,sortkey:1,showInMain:1}).then((data) => {
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