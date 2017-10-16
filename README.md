# Chat Node JS 

Le but de ce TP est de créer un chat sur navigateur avec Node JS. Nous nous focaliserons sur la partie serveur, du coup tout le code côté client est fourni dans le dossier *views/*.

## Introduction

### Installation

Pour pouvoir utiliser node sur les machines de la fac, une étape de configuration est nécessaire. Rendez-vous sur [cette page](https://intranet.fil.univ-lille1.fr/index.php/espace-documentaire/823-node-js) pour les explications.
Si vous voulez installer Node sur votre machine personnelle c'est [ici](https://nodejs.org/en/download/).  

Node utilise le gestionnaire de paquets npm pour installer les dépendances nécessaires au projet. Pour vérifier que Node est bien installé sur votre système, tapez la commande suivante : `npm -v`

Vous devriez obtenir un résultat comme celui-ci :
```
mouradeolive@b10p22:~/git/nodejs$ npm -v
5.4.2
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
Créez un fichier app.js à la racine de votre projet et copiez-collez le code ci-dessus. Démarrez votre serveur avec la commande `node app.js`.
Votre site est désormais accessible via http://localhost:3000.

## Cours

### Rappels

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
.post('/connexion/', function(req, res) {
	// TODO
});
```
Lorsqu'on ne précise pas le premier paramètre (l'URL), la fonction associée devient celle appellée par défaut
lorsqu'aucune autre route ne correspond.
```
app.get(function(req, res) {
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

router.get('/', function(req, res) {
	// Traitement quelconque...
    
	// C'est la fonction render qui va se charger d'envoyer les html au client.
    res.render('listUser.ejs');
})

// C'est cette ligne qui permet d'appeler "app.use('/user/list', listUser)" dans le fichier app.js.
// Car la méthode app.use() (dans notre fichier précédent) attend un routeur pour second paramètre.
module.exports = router;
```

### Lien MongoDB et serveur
Pour la gestion des utilisateurs, ont s'est basé sur [MongoDB](https://www.mongodb.com/fr).  
Tout les accès à mongoDB se feront dans le fichier mlab.js. Il existe déjà la methode *inscritption(username, password)* qui va créer un utilisateur dans la base. A vous de vous en inspirer afin de créer les méthodes :
- *connexion(username, password)*
- *listUser()*  

Indice : (utilisez la méthode user.findOne() et pensez à utiliser des promesses)   
Une fois les méthodes écrites, vous définirez les routes à créer dans **app.js** afin que le traitement approprié soit exécuté.  
Par exemple `app.use('/inscription', inscription)`.  
Vous définirez ainsi 3 routes inscription, connexion et chat.

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



### Communication par websockets

La gestion des messages côté client est déjà implémentée. En plus du disconnect, vous avez 2 types de messages à créer :  
- "nouveau_client" (lorsqu'un client se connecte on peut imaginer avertir les autres utilisateurs)
- "message" (lorsque le serveur recoit un message il le renvoie aux autres client)  


**Lucas Moura de Oliveira, Jean-Hugo Ouwe Missi Oukem, Eliott Bricout**
