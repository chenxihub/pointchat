const mongoose = require('mongoose');

//用户数据表

module.exports = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    age: {
        type: String,
        require: true
    }
});