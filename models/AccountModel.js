const mongoose = require('mongoose');

let AccountSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: Date.now
    },
    type: {
        type: Number,
        required: true
    },
    account: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
    }
}); // 创建一个模式对象

let AccountModel = mongoose.model('account', AccountSchema); // 创建一个模型对象


module.exports = AccountModel;