const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

//保存檔案的位置
const adapter = new FileSync('test_db.json')
const db = low(adapter)


//初始化數據
db.defaults({ posts: [], user: {} }).write()

//寫入數據
db.get('posts').push({ id: 1, title: 'lowdb is awesome'}).write();
db.get('posts').push({ id: 2, title: 'lowdb is good'}).write();
db.get('posts').push({ id: 3, title: 'Unicorn is awesome'}).write();

//讀取數據
console.log(db.get('posts').value());
//讀取到單條的數據
let res = db.get('posts').find({id: 1}).value();
console.log(res);

//刪除數據
db.get('posts').remove({id:2}).write();
console.log(res);

//更新數據
db.get('posts').find({id:1}).assign({title:'今天下雨了'}).write();