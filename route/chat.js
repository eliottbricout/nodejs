var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function(req, res) {
	if(!req.session.username){
		res.redirect('/');
	}
	res.render('chat.ejs', {username: req.session.username});
})

module.exports = router;
