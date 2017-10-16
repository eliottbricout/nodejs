# Chat Node JS 

Le but de ce TP est de créer un chat sur navigateur avec Node JS. Nous nous focaliserons sur la partie serveur, du coup tout le code côté client est fourni dans le dossier *views/*.
Vous implémenterez l'inscription, la connexion, et le chat coté serveur.

## Introduction

### Installation

Pour pouvoir utiliser node sur les machines de la fac, une étape de configuration est nécessaire. Rendez-vous sur [cette page](https://intranet.fil.univ-lille1.fr/index.php/espace-documentaire/823-node-js) pour les explications.
Si vous voulez installer Node sur votre machine personnelle c'est [ici](https://nodejs.org/en/download/).  

Node utilise le gestionnaire de paquets npm pour installer les dépendances nécessaires au projet. Pour vérifier que Node est bien installé sur votre système, tapez la commande suivante : `node -v`

Vous devriez obtenir un résultat comme celui-ci :
```
mouradeolive@b10p22:~/git/nodejs$ node -v
v8.6.0
```

Une fois Node installé, vous pouvez cloner ce projet avec `git clone https://github.com/eliottbricout/nodejs.git` et installer les dépendances sur votre machine avec la commande `npm install` (la commande doit être lancée à la racine du projet, là où se trouve le fichier **package.json**)
### Hello World
Pour créer un serveur de base qui retourne toujours la même page, c'est très simple.
```
const { createServer } = require('http'); // On récupère la méthode createServer du module http.

// On crée notre serveur. Ici la variable "request" correspond à ce qui à été envoyé par le client,
// et response correspond à ce qu'on va lui répondre.
const server = createServer((request, response) => {
	// On écrit le code de retour HTTP (200 = OK).
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // On renvoit toujours un Hello World.
    response.end('Hello World\n');
});
// On fait écouter le serveur sur le port 3000.
server.listen(3000) ;
```
Dans le fichier app.js à la racine de votre projet et copiez-collez le code ci-dessus. Démarrez votre serveur avec la commande `node app.js`.
Votre site est désormais accessible via http://localhost:3000.

## Cours

### Rappels

Un objet en JS peut se définir de plusieurs manière: 
```
var obj = {}
var obj = new Object(); // équivalent à la ligne du dessus
```
Chaque champ peut contenir une variable (string, boolean, int) voire même un autre objet.  
```
var object =  {
	key : "valeur",
	key2 : [1, true, '3', [], {}],
	key3 : {
		key : false
	}
}
```
Pour accèder à un champ d'un objet : `object.key2[1] // true`  

Pour créer un champ dans un objet il suffit de lui assigner une valeur, il n'y a pas besoin de le déclarer au préalable :  
```
var obj = {};
obj.name = "Morty"
console.log(obj.name) // Morty
```


Pour plus d'info cf. les slides.


### Création des routes

La force de npm (et de node en général) c'est l'utilisation des modules crées par la communauté. Pour la gestion de nos routes on utilisera le module Express qui simplifie l'envoi de contenu HTML et offre une meilleure séparation des fonctionnalités.

```
// On récupère le module express.
var express = require('express');
var app = express();
```
Pour une URL du site (ici la racine) on définit une fonction qui va se charger de retourner du html.
```
app.get('/', function(request, response) {
	response.render('index.html');
})
```
On peut aussi gérer les requêtes post, put et delete :
```
.post('/connexion/', function(request, response) {
	// TODO
});
```
Lorsqu'on ne précise pas le premier paramètre (l'URL), la fonction associée devient celle appellée par défaut
lorsqu'aucune autre route ne correspond.
```
app.get(function(request, response) {
	res.render('404notFound.html');
})
```
Enfin on peut écrire notre fonction dans un autre fichier afin de bien organiser notre projet.

Dans app.js :
```
listUser = require("./listUser");
app.use('/user/list', listUser)
```
Dans listUser.js :
```
const express = require('express');
// C'est le routeur qui va définir le comportement à avoir.
const router = express.Router();

router.get('/', function(request, response) {
	// Traitement quelconque...
    
	// C'est la fonction render qui va se charger d'envoyer les html au client.
    res.render('listUser.ejs');
})

// C'est cette ligne qui permet d'appeler "app.use('/user/list', listUser)" dans le fichier app.js.
// Car la méthode app.use() (dans notre fichier précédent) attend un routeur pour second paramètre.
module.exports = router;
```

### Base de données

Comme les accès réseaux des salles tp sont filtrés par un proxy, on utilisera un simple fichier json comme base de données.  
Pour manipuler notre base de donnée, on utilise sur le module **jsonfile**.
Pour lire un fichier *.json* on utilise la fonction :
```
const jsonfile = require('jsonfile');
jsonfile.readFile('toto.json', function(err, obj) {
	if(err){
		// Gestion d'erreur.
	}
  	// TODO
});
```
Pour écrire dans un fichier json on utilise la fonction `jsonfile.writeFileSync('toto.json', object)`  

Afin de ne pas réinventer la roue et de profiter un maximum des modules npm nous vous conseillons d'utiliser le module lodash qui regroupe plusieurs fonctions utiles telles que find, filter, concat etc... La doc du module se trouve [ici](https://lodash.com/docs/4.17.4)



### Les sockets 

Habituellement quand un client et un serveur communiquent via HTTP c'est le client qui initie la connexion et le serveur se contente de répondre à des requêtes. Dans certains cas on veut pouvoir initier une action depuis le serveur : c'est le cas dans les jeux vidéos en ligne ou dans notre cas pour un chat. Il existe plusieurs solutions pour pallier à ce problème (websockets, long-polling, ...). Ici nous allons nous intéresser au module ***socket.io*** qui se base sur les websockets.

Voici un exemple d'utilisation : 
```
function init(app){
var server = require('http').Server(app);
//On initialise notre gestionnaire de sockets (variable io) en lui passant en paramètre l'objet serveur
var io = require('socket.io')(server);
}
```
On récupère l'objet io sur lequel on va définir des actions à effectuer selon le type de message reçu. Par exemple:  
```
io.on('connection', function(socket) {
		// Pour un message du type "disconnect"
		socket.on('disconnect', function() {
        	// On envoie à tout les clients un message du type "parti_client" avec
            // le nom du client qui s'est déconnecté.
	        socket.broadcast.emit('parti_client', socket.pseudo);     
        }
        // TODO les autres types de message.
});
```

## Travail à effectuer

### Création des routes

Vous devez créer 3 routes au total pour gérer :
- l'inscription
- la connexion (qui redirige vers la page de chat si les identifiants sont valides)
- l'arrivée sur la page de chat

### Gestion base de données

Vous devez créer 3 fonctions pour gérer :
- l'inscription dans la base.
- la connexion dans la base.
- le listage des derniers utilisateurs inscrits (3 derniers).

### Communication par websockets

La gestion des messages côté client est déjà implémentée. En plus du disconnect, vous avez 2 types de messages à créer :  
- "nouveau_client" (lorsqu'un client se connecte on peut imaginer avertir les autres utilisateurs)
- "message" (lorsque le serveur recoit un message il le renvoie aux autres client)  


**Lucas Moura de Oliveira, Jean-Hugo Ouwe Missi Oukem, Eliott Bricout**
