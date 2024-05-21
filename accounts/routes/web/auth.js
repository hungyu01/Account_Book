var express = require('express');
var router = express.Router();

router.get('/reg', (req, res)=>{
    //回應html內容
    res.render('auth/reg');
});

module.exports = router;
