/**
 * 通过构造函数来操作数据库
 * @type {*|Mongoose}
 */
const mongoose = require('mongoose');

const chatsSchema = require('../schemas/chat');

module.exports = mongoose.model('Chat', chatsSchema);
