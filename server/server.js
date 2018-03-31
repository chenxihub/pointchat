//web框架模型
const express = require('express');
//引入操作数据库模型
const mongoose = require('mongoose');

//引入解析body数据
const bodyParser = require('body-parser');
//引入cookies

const cookiesParser = require('cookie-parser')
//引用用户数据模型
const User = require('../moduls/User');
//引用聊天数据模型
const Chat = require('../moduls/Chat');

//链接MongoDB
const DB_URL = 'mongodb://localhost:27017/PointChat';

//新建APP
const app = express();

/**
 * 1.链接express和websokit io
 * 2.启动http服务的server,传入express实例
 * 3.创建io 传入express的server
 * 引入websocket io
 * @type {Server}
 */
const server = require('http').Server(app);
const io = require("socket.io")(server);
/**
 * 4.尝试监听
 * 5.主要有两个方法：io.on   io.emmit
 */
io.on('connection', function (socket) {
    socket.on('sendMsg', function (data) {
        console.log(data)
        const {from,to,msg} = data;
        //拼接chatid
        const chatid = [from,to].sort().join('_');
        Chat.create({
            chatid:chatid,
            from:from,
            to:to,
            content:msg
        },function (err,doc) {
            io.emit('recvMsg', Object.assign({},doc._doc))
        })

    })
})


/**
 * body-parser 设置
 */
app.use(bodyParser.json())

/**
 * cookies-parser 设置
 */
app.use(cookiesParser())

/**
 * 按照不用的路径，去请求不同的接口api
 * user用户接口
 * api 公共api接口
 * boss 用户接口
 */
app.use('/user', require('../routers/user'));
app.use('/chat', require('../routers/chat'));
// app.use('/boss', require('../routers/boss'));


//链接数据库
mongoose.connect(DB_URL, function (err) {
    if (err) {
        console.log('mongoDB connect fail')
    } else {
        console.log('mongoDB connect successful');
        server.listen(9093, function () {
            console.log('Node app start at port 9093')
        });
    }
});

