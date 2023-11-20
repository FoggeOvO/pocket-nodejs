const express = require('express');
const router = express.Router();
const md5 = require('md5');
const session = require('express-session');
const UserModel = require('../../models/UserModel');
const jwt = require('jsonwebtoken');
const secret = require('../../config/config').secret;

router.post('/gettoken', (req, res, next) => {
  let { username, password } = req.body;
  console.log('@', req.body);
  UserModel.findOne({ username: username, password: md5(password) })
    .then((data) => {
      if (!data) {
        res.json({
          code: '1000',
          msg: '账号或密码错误'
        });
      } else {
        //登陆成功响应
        jwt.sign({
          username: username,
          password: password
        }, secret, {
          expiresIn: 60 * 60 * 24 * 7
        }, (err, token) => {
          if (err) {
            console.log(err);
            return;
          }
          req.session.token = data.token
          res.json({
            code: '0000',
            msg: 'success',
            data: token
          });
        });
      }
    }).catch((err) => {
      res.status(500).send('登陆异常,请稍后再试~');
    });
});




module.exports = router;
