const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: true
    }
}); // 创建一个模式对象

let UserModel = mongoose.model('user', UserSchema); // 创建一个模型对象


module.exports = UserModel;