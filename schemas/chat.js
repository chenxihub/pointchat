const mongoose = require('mongoose');

//用户数据表

module.exports = new mongoose.Schema({
    "chatid": {
        "type": String,
        "require": true
    },
    "from": {
        "type": String,
        "require": true
    },
    "to": {
        "type": String,
        "require": true
    },
    "read": {
        "type": Boolean,
        "require": true,
        "default": false
    },
    "content": {
        "type": String,
        "require": true,
        "default": ''
    },
    "time": {
        "type": Number,
        "default": new Date().getTime()
    }
});