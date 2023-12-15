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
    },
    workcode: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    depid: {
        type: Number,
        required: true
    },
    hiredate: {
        type: String,
        required: true
    },
    actConfData: {
        type: String,
        required: true
    },
    costcenter: {
        type: String,
        required: true
    },
    isCN: {
        type: Number,
        required: true
    },
    houseAllance: {
        type: Number,
        required: true
    },
    isConf: {
        type: Number,
        required: true
    },
    isTech: {
        type: Number,
        required: true
    },
    mealAllance: {
        type: Number,
        required: true
    },
    national: {
        type: String,
        required: true
    },
    remark: {
        type: String,
        required: true
    },
    salGroup: {
        type: Number,
        required: true
    },
}); // 创建一个模式对象

let UserModel = mongoose.model('user', UserSchema); // 创建一个模型对象


module.exports = UserModel;