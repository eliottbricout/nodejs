var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var user_service = require('../user.service');

router.get('/', function(req, res) {
	if(!req.session.username){
		res.redirect('/');
	}

	res.render('chat.ejs', {username: req.session.username, users : user_service.listUser(5)});
})

module.exports = router;
