var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mlab = require('../mlab');

router.get('/', function(req, res) {
    res.render('inscription.ejs');
})

.post('/', urlencodedParser, function(req, res) {
	// TODO
})

module.exports = router;