const express = require('express');
//MD5加密
const util = require('utility');
const router = express.Router();

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
router.get('/list', function (req, res) {
    // userModul.remove({},function (err,doc) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         return res.json(doc)
    //     }
    // });
    const {type} = req.query;

    userModul.find({type}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc)
            return res.json({
                code: 0,
                data: doc
            })
        }
    })
});
/**
 * 注册接口
 */
router.post('/register', function (req, res) {
    console.log(req.body);
    const {user, password, type} = req.body;
    //查询数据库
    userModul.findOne({user: user}, function (err, doc) {
        if (doc) {
            return res.json({
                code: 1,
                msg: '用户名重复了'
            })
        }
        const userSave = new userModul({
            user: user,
            password: MD5PWD(password),
            type: type
        });
        userSave.save(function (err, doc) {
            if (err) {
                return res.json({
                    code: 1,
                    msg: 'Oops,后端出错了'
                })
            } else {
                const {user, type, _id} = doc;
                res.cookie('uid', doc._id);
                return res.json({
                    code: 0,
                    data: {user, type, _id}
                })
            }
        });
    })
});
/**
 * 登录接口
 */
router.post('/login', function (req, res) {
    const {user, password} = req.body;
    userModul.findOne({
        user: user,
        password: MD5PWD(password)
    }, __filter, function (err, doc) {
        console.log("错误信息：" + err);
        if (!doc) {
            return res.json({
                code: 1,
                msg: 'Oops,用户名或者密码错误'
            })
        } else {
            console.log(doc);
            res.cookie('uid', doc._id);
            return res.json({
                code: 0,
                data: doc
            })
        }
    })
});
/**
 * info 是判断进来是否登录过了，免登陆校验
 */
router.get('/info', function (req, res) {
    const {uid} = req.cookies;
    if (!uid) {
        return res.json(
            {
                code: 1
            }
        )
    }
    userModul.findOne({_id: uid}, __filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: 'Oops,后端出错了'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })

});
/**
 * 更新资料接口
 */
router.post('/update', function (req, res) {
    const uid = req.cookies.uid;
    if (!uid) {
        return res.dumps({code: 1})
    }
    const body = req.body;
    userModul.findByIdAndUpdate(uid, body, function (err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({code: 0, data})
    })
});

/**
 * MD5 加密
 * @param password
 * @constructor
 */
function MD5PWD(password) {
    const salt = 'joex_Hello_b23jl2lxDFADFLdjl_fadslj2-dalkdjcl';
    return util.md5(util.md5(password + salt));
}

module.exports = router;