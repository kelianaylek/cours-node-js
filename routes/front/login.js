var express = require('express');
var router = express.Router();
var path = require('path')
const app = express();

let reqPath = path.join(__dirname, '../../')

router.get('/', function(req, res, next) {
    res.sendFile(reqPath + "/login.html");
   
});



module.exports = router;

