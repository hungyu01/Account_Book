var express = require('express');
var router = express.Router();

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

module.exports = router;
