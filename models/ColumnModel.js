const mongoose = require('mongoose');

let ColumnsSchema = new mongoose.Schema({
    tablename: {
        type: String,
        required: true
    },
    columnname: {
        type: String,
        required: true
    },
    disvislabe: {
        type: Number,
        enum: [0, 1],
        default: 0,
        required: true
    }
}); // 创建一个模式对象

let ColumnsModel = mongoose.model('column', ColumnsSchema); // 创建一个模型对象


module.exports = ColumnsModel;