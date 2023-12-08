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
  UserModel.findOne({ username: username, password: md5(password)},{lastname:1,workcode:1,_id:0})
    .then((data) => {
      if (!data) {
        res.json({
          code: '1000',
          msg: '账号或密码错误'
        });
      } else {
        //登陆成功响应
        const token = jwt.sign({
          username: username,
        }, secret, {
          expiresIn: 60 * 60 * 24 * 7
        })
        res.json({
          code: '0000',
          msg: 'success',
          token,
          user:data
        });
      }
    }).catch((err) => {
      res.status(500).send('登陆异常,请稍后再试~');
    });
});




module.exports = router;
