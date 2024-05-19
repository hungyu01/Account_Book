const mongoose = require('mongoose');

// 定義書籍 schema
const AccountSchema = new mongoose.Schema({
    title:{type:String, required: true},
    time: Date,
    type:{type: Number, default:-1},
    account:{type: Number, require: true},
    remarks:{type: String}
});

// 創建模型對象，對文檔的操作對象
const AccountModel = mongoose.model('accounts', AccountSchema);

module.exports = AccountModel;