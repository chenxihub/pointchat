const express = require('express');
const mongoose = require('mongoose');

//引用用户数据模型
const User = require('../moduls/User');

//链接MongoDB
const DB_URL = 'mongodb://localhost:27017/PointChat';

//新建APP
const app = express();

// User.create({
//     user: 'react-native',
//     age: 18
// }, function (err, doc) {
//     if (!err) {
//         console.log(doc);
//     }
// });


//匹配请求路径
app.get('/', function (req, res) {
    User.remove({
        age: 18
    }, function (err, doc) {
        res.send(doc);
    })
});

app.get('/data', function (req, res, next) {
    User.find({}, function (err, doc) {
        res.json(doc);
    })
})
//链接数据库
mongoose.connect(DB_URL, function (err) {
    if (err) {
        console.log('mongoDB connect fail')
    } else {
        console.log('mongoDB connect successful');
        app.listen(9093, function () {
            console.log('Node app start at port 9093')
        });
    }
});

