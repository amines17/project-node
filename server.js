// Imports
var express = require('express');

// Instantiate server
var server = express();

// Configures routes
server.get('/', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<center><h1>Bonjour, bienvenue sur mon serveur HTTP !</h1><br><h3>© SOUFI Amine</h3></center>');
});

// Launch server
server.listen(8080, function() {
    console.log('Serveur en écoute ! :)')
});