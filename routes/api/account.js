const express = require('express');
const router = express.Router();
const AccountModel = require('../../models/AccountModel');
const moment = require('moment');

//导入中间件检测用户是否登陆
const checkToken = require('../../middlewares/checkTokenMiddleware');

router.get('/account', checkToken,function (req, res, next) {
  console.log(req.username);
  AccountModel.find().sort({ time: 1 }).exec().then(data => {
    res.json({
      code: '0000',
      msg: 'success',
      data: data
    });
  }).catch(err => {
    res.json({
      code: '1001',
      msg: '查询失败',
      data: null
    });
    console().log(err);
  });
});

router.post('/account',checkToken, function (req, res, next) {
  AccountModel.create(
    req.body
  ).then((data) => {
    res.json({
      code: '0000',
      msg: 'success',
      data: data
    });
  }).catch((err) => {
    res.json({
      code: '1002',
      msg: '新增失败',
      data: null
    });
  });
});

router.delete('/account/:id', checkToken,function (req, res, next) {
  let id = req.params.id;
  AccountModel.deleteOne({ _id: id }).then((data) => {
    res.json({
      code: '0000',
      msg: 'success',
      data: data
    });
  }).catch((err) => {
    res.json({
      code: '1003',
      msg: '删除失败',
      data: null
    });
  });
});

router.patch('/account/:id', checkToken,function (req, res, next) {
  let id = req.params.id;
  AccountModel.updateOne({ _id: id }, req.body).then((data) => {
    AccountModel.findById(id).then((data) => {
      res.json({
        code: '0000',
        msg: 'success',
        data: data
      });
    })
  }).catch((err) => {
    res.json({
      code: '1004',
      msg: '更新失败',
      data: null
    });
    console.log(err);
  });
});

router.get('/account/:id', checkToken,function (req, res, next) {
  let id = req.params.id;
  AccountModel.findById({ _id: id }).then((data) => {
    res.json({
      code: '0000',
      msg: 'success',
      data: data
    })
  }).catch((err) => {
    res.json({
      code: '1005',
      msg: '查询失败',
      data: null
    });
    console.log(err);
  });
});



module.exports = router;
