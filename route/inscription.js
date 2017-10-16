var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var user_service = require('../user.service');

router.get('/', function(req, res) {
    res.render('inscription.ejs');
})

.post('/', urlencodedParser, function(req, res) {
	if(req.body.password !== req.body.password2){
		res.redirect('/inscription');
	}else{
		user_service.inscription(req.body.username,req.body.password)
		res.redirect('/');
	}
})

module.exports = router;
