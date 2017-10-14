var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
var mlab = require('./mlab');

app.use(session({secret: '1234'}))

.get('/', function(req, res) {
    res.render('index.ejs');
})

.get('/inscription', function(req, res) {
    res.render('inscription.ejs');
})

.get('/chat', function(req, res) {
	if(!req.session.username){
		res.redirect('/');
	}
	res.render('chat.ejs', {username: req.session.username});
})

.post('/connexion/', urlencodedParser ,function(req, res) {
	mlab.connexion(req.body.username,req.body.password).then(function(){
		req.session.username = req.body.username;
    	res.redirect('/chat');
	},function(){
    	res.redirect('/');
	});
})

.post('/inscription/', urlencodedParser, function(req, res) {
	if(req.body.password != req.body.password2){
		res.redirect('/inscription');
	}else{
		mlab.inscription(req.body.username,req.body.password)
		res.redirect('/');
	}
})

.use(function(req, res, next){
    res.redirect('/');
})

app.listen(8080);