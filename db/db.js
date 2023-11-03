
const mongoose = require('mongoose');
const dbConfig = require('../config/config.js');

mongoose.connect(`mongodb://${dbConfig.dburl}:${dbConfig.dbPort}/${dbConfig.dbName}`);

function db(success, error) {
    if(typeof error !== 'function') {
        error = err => {
            console.log(error);
        }
    }

    mongoose.connection.once('open', () => {
        success();
    }); // 连接成功 

    mongoose.connection.once('error', () => {
        error();
    });

    mongoose.connection.once('close', () => {
        console.log('数据库连接已断开');
    }); // 连接断开

}

module.exports = db;