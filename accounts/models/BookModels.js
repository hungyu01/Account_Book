const mongoose = require('mongoose');

// 定義書籍 schema
const BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
});

// 創建模型對象，對文檔的操作對象
const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;
