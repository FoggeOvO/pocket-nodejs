const express = require('express');
const router = express.Router();
const md5 = require('md5');
const AccountModel = require('../../models/AccountModel');
const moment = require('moment');

router.post('/account', function (req, res, next) {
  AccountModel.create(
    req.body
  ).then((result) => {
    console.log(result);
    res.render('success', { title: '添加成功了~', url: '/account' })
  }).catch((err) => {
    res.status(500).send(err);
  });
});

router.get('/account/:id', function (req, res, next) {
  let id = req.params.id;
  AccountModel.deleteOne({_id:id}).then((result) => {
    res.render('success', { title: '删除成功了~', url: '/account' });
  }).catch((err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
