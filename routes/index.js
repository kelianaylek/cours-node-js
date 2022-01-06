var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    return res.status(200).json("oauzgd");
});


router.get('/username', (req, res, next) => {
    return res.json({msg: 'Matthis Blondin'});
})
router.post('/login', (req, res, next) => {
    const {email, password} = req.body
    console.log(req.body)

 if (password !== 'test') {
     return res.status(401).json({error: 'Mot de passe incorrect'})
 }
    return res.json({msg: 'Matthis Blondin'});

})


module.exports = router;
