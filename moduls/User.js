/**
 * 通过构造函数来操作数据库
 * @type {*|Mongoose}
 */
const mongoose = require('mongoose');

const usersSchema = require('../schemas/user');

module.exports = mongoose.model('User', usersSchema);
