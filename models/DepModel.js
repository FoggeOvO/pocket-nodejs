const mongoose = require('mongoose');

let DepSchema = new mongoose.Schema(
    {
        depname: {
            type: String,
            required: true
        },
        depid: {
            type: Number,
            required: true
        },
        parent: {
            type: Number,
            required: true
        }
    }
); // 创建一个模式对象

let DepModel = mongoose.model('department', DepSchema); // 创建一个模型对象


module.exports = DepModel;