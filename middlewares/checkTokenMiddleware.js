const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');
module.exports = (req, res, next) => {
    let token = req.get('token');
    if (!token) {
        return res.json({
            code: '1000',
            msg: 'token不存在',
            data: null
        });
    }

    jwt.verify(token, secret, (err, data) => {
        if (err) {
            return res.json({
                code: '1000',
                msg: 'token不合法',
                data: null
            });
        }
        //保存用户信息
        req.username = data;
        //如果token合法，将用户信息保存到req对象中，方便后续使用
        next();
    });
}