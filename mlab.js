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

function connexion(username,password){
	let deferred = Q.defer();
	password = md5(password);
	user.findOne( {username,password} ).then(function(item){
		item ? deferred.resolve() : deferred.reject();
	});
	return deferred.promise;
}

function inscription(username,password){
	let deferred = Q.defer();
	password = md5(password);
	user.insert({username,password}).then(function(item){
		deferred.resolve();
	});
	return deferred.promise;
}

function listUser(){
	let deferred = Q.defer();
	user.find({}).sort({'_id':-1}).limit(5).toArray().then(function(users){
		console.log(users)
		let listusers = _.map(users, (item) => {
			return item.username;
		});
		console.log(listusers)
		deferred.resolve(listusers);
	});
	return deferred.promise;
}

module.exports = {
	connexion,
	inscription,
	listUser
};