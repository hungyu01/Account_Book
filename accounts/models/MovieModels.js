const mongoose = require('mongoose');

// 定義書籍 schema
const MovieSchema = new mongoose.Schema({
    title: String,
    director: String
});

// 創建模型對象，對文檔的操作對象
const MovieModel = mongoose.model('Movie', MovieSchema);

module.exports = MovieModel;