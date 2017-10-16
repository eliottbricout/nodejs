var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser'); 

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
var user_service = require('./user.service');
var socket = require('./socket')(app);
socket.listen(9000);

var inscription = require('./route/inscription');
var chat = require('./route/chat');

app.use(session({secret: '1234'}))
.use("/css", express.static(__dirname + '/resources/css'))

.get('/', function(req, res) {
    res.render('index.ejs');
})

.use('/inscription', inscription)
.use('/chat', chat)

.post('/connexion/', urlencodedParser ,function(req, res) {
	if(user_service.connexion(req.body.username,req.body.password)){
		req.session.username = req.body.username;
    		res.redirect('/chat');
	} else {
    		res.redirect('/');
	}
})

.use(function(req, res, next){
    res.redirect('/');
});

app.listen(8080);
