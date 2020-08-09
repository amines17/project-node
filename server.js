// Imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;

// Instantiate server
var server = express();

//Body Parser config
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Configures routes
server.get('/', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<center><h1>Bonjour, bienvenue sur mon serveur HTTP !</h1><br><h3>© SOUFI Amine</h3></center>');
});

server.use('/api/', apiRouter);

// Launch server
server.listen(8080, function() {
    console.log('Le serveur est lancé ! :)')
});