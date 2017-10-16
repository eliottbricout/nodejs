const jsonfile = require('jsonfile');
const file = require('./package.json').fileuser;
const md5 = require('md5');
const _ = require('lodash');
var users;

jsonfile.readFile(file, function(err, obj) {
	if(err){
		console.log("erreur lors de la lecture du fichier utilisateur");
		console.log(err);
		obj = {};
	}
  	users = obj;
  	if(!_.isArray(users.listuser)){
		users.listuser = [];
	}
});


function connexion(username,password){
	return Boolean(_.find(users.listuser, { username, 'password': md5(password) }));
}

function inscription(username,password){
	password = md5(password);

	users.listuser.push({username,password});

	return jsonfile.writeFileSync(file, users, {spaces: 4});
}

function listUser(nbuser){
	return _.map(_.takeRight(users.listuser, nbuser),'username');
}

module.exports = {
	connexion,
	inscription,
	listUser
};
