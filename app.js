var express = require('express');
var session = require('cookie-session');
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
var mlab = require('./mlab');
var socket = require('./socket')(app);
socket.listen(9000);

app.use(session({secret: '1234'}))
.get('/', function(req, res) {
    res.render('index.ejs');
})

// TODO les autres routes.

// On garde cette route à la fin qui redirige sur la racine du site au cas ou aucune route n'est trouvé.
.use(function(req, res, next){
    res.redirect('/');
});

app.listen(8080);