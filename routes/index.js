var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 res.redirect('/manageUsers');
});

//Route To Render Home Page
router.get("/home", function (req, res) {
    res.redirect('/manageUsers');
});

module.exports = router;
