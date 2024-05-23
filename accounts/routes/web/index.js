const express = require('express');
const router = express.Router();
//導入 moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

//宣告登入檢測的 middleware
let checkLoginMiddleware = require('../../middleware/checkLoginMiddleware')

// 記帳本
router.get('/account', checkLoginMiddleware, async function(req, res, next) {
  
  try {
    // 從資料庫中讀取所有的帳單訊息，按時間降序排列
    let accounts = await AccountModel.find().sort({ time: -1 }).exec();
    res.render('list', { accounts: accounts, moment: moment });
  } catch (error) {
    res.status(500).send('讀取失敗！');
  }
});

//新增紀錄
router.get('/account/create', checkLoginMiddleware, function(req, res, next) {
  res.render('create');
});

// 新增紀錄
router.post("/account", checkLoginMiddleware, async (req, res) => {
  try {
    // 將日期轉成 Date 類型
    let account = new AccountModel({
      ...req.body,
      time: moment(req.body.time).toDate()
    });

    // 儲存到資料庫中
    await account.save();

    // 成功後重定向
    res.render('success', { msg: '新增成功喔！！', url: '/account' });
  } catch (error) {
    res.status(500).send('插入失敗！！');
  }
});

//刪除記帳紀錄
router.get('/account/:id', checkLoginMiddleware, async (req, res) => {
  try {
    // 獲得 params 的 id 參數
    let id = req.params.id;

    // 刪除記錄
    await AccountModel.findByIdAndDelete(id);

    // 提醒
    res.render('success', { msg: '刪除成功喔～～', url: '/account' });
  } catch (error) {
    res.status(500).send('刪除失敗！！');
  }
});

module.exports = router;
