const mongodb = require('mongodb');
const paramMlab = require('./package.json').mongodb;
const Q = require('q');
const md5 = require('md5');
const _ = require('lodash');
const uri = "mongodb://" + paramMlab.user + ":" + paramMlab.password + "@" + paramMlab.host + ":" + paramMlab.port + "/" + paramMlab.db;
var user;

mongodb.MongoClient.connect(uri).then(function(db){
	console.log("connexion à la base de donnée : OK");
    user = db.collection('user');
},function(err){
	console.log("connexion à la base de donnée : KO");
	console.log(err);
});

function inscription(username,password){
	password = md5(password);
	return user.insert({username,password});
}

function connexion(username,password){
	// TODO
}

function listUser(){
	// TODO
}

module.exports = {
	connexion,
	inscription,
	listUser
};