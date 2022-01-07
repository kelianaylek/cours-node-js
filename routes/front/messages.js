var express = require('express');
var router = express.Router();
var path = require('path')
let reqPath = path.join(__dirname, '../../')

router.get('/', function(req, res, next) {
    res.sendFile(reqPath + "/messages.html");
});



module.exports = router;
