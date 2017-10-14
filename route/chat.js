var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mlab = require('../mlab');

router.get('/', function(req, res) {
	if(!req.session.username){
		res.redirect('/');
	}
	return mlab.listUser().then((users) => {
		res.render('chat.ejs', {username: req.session.username,users});
	});
})

module.exports = router;
