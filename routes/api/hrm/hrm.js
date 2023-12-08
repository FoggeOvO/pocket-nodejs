const express = require('express');
const router = express.Router();
const UserModel = require('../../../models/UserModel');

//导入中间件检测用户是否登陆
const checkToken = require('../../../middlewares/checkTokenMiddleware');

router.get('/getusers', checkToken, function (req, res, next) {
  UserModel.find({ "isdel": 0 }, { lastname: 1, workcode: 1, hiredate: 1, position: 1, level: 1, gender: 1, _id: 1, hiredata: 1, depid: 1, actConfData: 1, costcenter: 1, houseAllance: 1, isCN: 1, isConf: 1, isTech: 1, mealAllance: 1, national: 1, remark: 1, salGroup: 1 }).then((data) => {
    if (!data) {
      res.json({
        code: '3001',
        msg: '数据为空'
      });
    } else {
      res.json({
        code: '0000',
        msg: 'success',
        data: data
      });
    }
  })
    .catch((err) => {
      res.status(500).send('获取数据异常,请稍后再试~', err);
    });
});

router.post('/getuserByDepid', checkToken, function (req, res, next) {
  let { depids } = req.body;
  UserModel.find({ "isdel": 0, "depid": { $in: depids } }, { lastname: 1, workcode: 1, hiredate: 1, position: 1, level: 1, gender: 1, _id: 1, hiredata: 1, depid: 1, actConfData: 1, costcenter: 1, houseAllance: 1, isCN: 1, isConf: 1, isTech: 1, mealAllance: 1, national: 1, remark: 1, salGroup: 1 }).then((data) => {
    if (!data) {
      res.json({
        code: '3001',
        msg: '数据为空'
      });
    } else {
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