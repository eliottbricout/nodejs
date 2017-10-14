const mongodb = require('mongodb');
const paramMlab = require('./package.json').mongodb;
const Q = require('q');

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
	user.findOne( {username,password} ).then(function(item){
		console.log(item);
		item ? deferred.resolve() : deferred.reject();
	});
	return deferred.promise;
}

function inscription(username,password){
	let deferred = Q.defer();
	user.insert({username,password}).then(function(item){
		Promise.resolve();
	});
	return deferred.promise;
}


module.exports = {
	connexion,
	inscription
};