# Chat Node JS 
Le but de ce TP étant de comprendre le fonctionnement de base d'une application sous node.js, la partie UI vous sera fournie dans le dossier *views/*, ainsi vous n'aurez qu'a vous concentrer sur le code coté serveur.

## 5 Étapes

### Installation

NPM devrait déjà être installé sur les machines des salles TP. Si vous voulez l'installer sur votre machine personnelle c'est [ici](https://nodejs.org/en/download/).  
Une fois NPM installé (à vérifier avec npm -v), vous pouvez cloner ce projet et installer les dépendances sur votre machine avec la commande `npm install` (la commande doit être lancé dans le dossier du projet, là ou se trouve le fichier **package.json**)
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
Avec ce code dans votre fichier principal (nommé app.js par convention) Démarrez le serveur avec la commande `node app.js`.
Votre site est désormais accessible via http://localhost:3000.
### Les routes
Il existe un moyen plus simple pour renvoyer du code html au client: le module express.  
Ce dernier permet, en plus de gérer les routes pour notre application web, d'envoyer directement des fichiers html.
```
// On récupère le module express.
var express = require('express');
var app = express();
```
Pour la racine du site on définit une fonction qui va se charger de retourner du html.
```
app.get('/', function(req, res) {
	res.render('index.html');
})
```
On peut aussi gerer les requêtes post.
```
.post('/connexion/', function(req, res) {
	// TODO
});
```
Lorsqu'on ne précise pas le premier paramètre, la fonction associé devient celle appellé par défaut
lorsqu'aucune autre route ne correspond.
```
app.get(function(req, res) {
	res.render('404notFound.html');
})
```
Enfin on peut écrire notre fonction dans un autre fichier afin de bien organiser notre projet.
```
listUser = require("./listUser");
app.use('/user/list', listUser)
```
Dans notre fichier listUser.js
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
Notre fichier socket.js contiendra tout le code relatif au réseau. Il utilise le module **ent**  
```
const ent = require('ent');
function init(app){
var server = require('http').Server(app);
var io = require('socket.io')(server);
```
On récupère l'object io sur lequel on va définir des actions à effectuer selon le type de message reçu. Par exemple:  
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
La gestion des messages coté client est déjà implémenté. En plus du disconnect, vous avez 2 types de messages à créer:  
- "nouveau_client" (lorsqu'un client se connecte on peut imaginer avertir les autres utilisateurs)
- "message" (lorsque le serveur recoit un message il le renvoie aux autres client)  


**Lucas Moura de Oliveira, Jean-Hugo Ouwe Missi Oukem, Eliott Bricout**