const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {secret} = require('../../config/config');


router.post('/getToken',function (req, res, next) {
  jwt.sign({
    username:req.username,
    _id:req._id
  },secret,{
    expiresIn: 60*60*24*7
  },(err,token)=>{
    if(err){
      console.log(err);
      return;
    }
    res.json({
      code: '0000',
      msg: 'success',
      data: token
    });
  });
});


module.exports = router;
