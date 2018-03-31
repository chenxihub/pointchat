const mongoose = require('mongoose');

//用户数据表

module.exports = new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    desc: {
        type: String
    },
    title: {
        type: String
    },
    company: {
        type: String
    },
    money: {
        type: String
    }
});