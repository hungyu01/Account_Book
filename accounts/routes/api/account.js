var express = require('express');
var router = express.Router();


//導入 moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');

// 記帳本
router.get('/account', async function(req, res, next) {
  try {
    // 從資料庫中讀取所有的帳單訊息，按時間降序排列
    let accounts = await AccountModel.find().sort({ time: -1 }).exec();
    res.json({
        code:'0000',
        msg:'讀取成功',
        data: accounts
    });
  } catch (error) {
    res.json({
        code: '1000',
        msg: '讀取失敗',
        data: null
    })
  }
});

// 新增紀錄
router.post("/account", async (req, res) => {
  try {
    // 將日期轉成 Date 類型
    let account = new AccountModel({
      ...req.body,
      time: moment(req.body.time).toDate()
    });
    // 儲存到資料庫中
    await account.save();
    // 成功後重定向
    res.json({
        code: '0000',
        msg: '新增成功',
        data: account
    })
  } catch (error) {
    res.json({
        code: '1001',
        msg: '新增失敗',
        data: null
    });
  }
});

// 刪除記帳紀錄
router.delete('/account/:id', async (req, res) => {
    try {
      // 獲得 params 的 id 參數
      let id = req.params.id;
      // 刪除記錄
      await AccountModel.findByIdAndDelete(id);
      // 提醒
      res.json({
        code: '0000',
        msg: '刪除成功',
        data: {}
      })
    } catch (error) {
        res.json({
            code: '1002',
            msg: '刪除失敗',
            data: null
          })
    }
  });

// 獲取單個資料訊息
router.get('/account/:id', async function(req, res) {
    try {
        // 獲得 params 的 id 參數
        let id = req.params.id;
        // 查詢單筆記錄
        let account = await AccountModel.findById(id);
        // 如果找到記錄，回傳該記錄；否則回傳錯誤訊息
        if (account) {
            res.json({
                code: '0000',
                msg: '查詢成功',
                data: account
            });
        } else {
            res.json({
                code: '1014',
                msg: '找不到對應的記錄',
                data: null
            });
        }
    } catch (error) {
        res.json({
            code: '1004',
            msg: '查詢失敗！！',
            data: null
        });
    }
});

// 更新單筆訊息
router.patch('/account/:id', async function(req, res){
    try {
        // 獲得 params 的 id 參數
        let id = req.params.id;
        // 更新記錄
        let account = await AccountModel.findByIdAndUpdate(id, req.body, { new: true });
        // 如果找到記錄，回傳該記錄；否則回傳錯誤訊息
        if(account){
            res.json({
                code: '0000',
                msg: '更新成功',
                data: account
            });
        } else {
            res.json({
                code: '1015',
                msg: '找不到可更新的記錄',
                data: null
            });
        }
    } catch (error) {
        res.json({
            code: '1005',
            msg: '更新失敗',
            data: null
        });
    }
});

module.exports = router;
