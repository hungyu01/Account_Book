var express = require('express');
var router = express.Router();
const session = require('express-session');
const MongoStore = require('connect-mongo');
//導入 UserModel 模型
const UserModel = require('../../models/UserModel')
//導入 md5 加密密碼
const md5 = require('md5');

//註冊頁面
router.get('/reg', (req, res)=>{
    //回應html內容
    res.render('auth/reg');
});

//註冊內容
router.post('/reg', async(req, res)=>{
    //表單驗證
    //讀取請求的數據
    UserModel.create({...req.body, password: md5(req.body.password)})
    try {
        const data = await UserModel.create(req.body);
        res.render('success', { msg: '註冊成功', url: '/login' });
    } catch (err) {
        console.error(err);
        res.status(500).send('註冊失敗，請稍後再試');
    }
});

//登入頁面
router.get('/login', (req, res)=>{
    //回應html內容
    res.render('auth/login');
});

// 登入的操作
router.post('/login', async (req, res) => {
    // 取得用戶名跟密碼
    let { username, password } = req.body;

    try {
        // 查詢資料庫密碼
        const user = await UserModel.findOne({ username: username, password: md5(password) });
        if (user) {
            req.session.username = user.username;
            req.session._id = user._id;
            res.render('success', { msg: '登入成功', url: '/account' });
        } else {
            res.status(500).send('帳號或密碼錯誤，請稍後再試');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('帳號或密碼錯誤，請稍後再試');
    }
});

//退出登入
router.post('/logout', (req, res)=>{
    // destory session
    req.session.destroy(()=>{
        res.render('success', {msg:'您已登出', url:'/login'})
    });
});


module.exports = router;
