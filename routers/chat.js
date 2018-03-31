const express = require('express');
const router = express.Router();

//引入Chat数据库操作模型
const chatModul = require('../moduls/Chat');
//引入User数据库操作模型
const userModul = require('../moduls/User');
/**
 * 过滤密码和__v
 */
const __filter = {
    password: 0,
    __v: 0
};

//测试数据接口list
router.get('/getmsglist', function (req, res) {
    // userModul.remove({},function (err,doc) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         return res.json(doc)
    //     }
    // });
    const user = req.cookies.uid;
    console.log('有用户连接请求');
    userModul.find({}, function (err, userdoc) {
        let users = {};
        userdoc.forEach(value => {
            users[value._id] = {name: value.user, avatar: value.avatar}
        })
        console.log(users);
        chatModul.find({
            '$or': [{from: user}, {to: user}]
        }, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log(doc)
                return res.json({
                    code: 0,
                    msgs: doc,
                    users: users
                })
            }
        })
    })

});


module.exports = router;