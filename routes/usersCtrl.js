// Imports
var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

// Routes
module.exports = {
    register: function(req, res){
        // Paramètres
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var bio = req.body.bio;

        if(email == null || username == null || password == null) {
            return res.status(400).json({ 'ereur': 'paramètres manquant'});
        }

        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound){
            if(!userFound){
                bcrypt.hash(password, 5, function( err, bcryptedPassword){
                    var newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        bio: bio,
                        isAdmin: 0
                    })
                    .then(function(newUser){
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err){
                        return res.status(500).json({ 'ereur' : "impossible d'ajouter un utilisateur" });
                    })
                });
            } else {
                return res.status(409).json({'ereur': 'Adresse email déjà utilisé !'});
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'ereur': "Impossible de vérifier si l'utilisateur existe"});
        });
    },
    login: function(req, res){

        // Paramètres
        var email = req.body.email;
        var password = req.body.password;

        if(email == null || password == null) {
            return res.status(400).json({ 'ereur': 'paramètres manquant'});
        }

        models.User.findOne({
            where: { email : email }
        })
        .then(function(userFound){
            if(userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                    if(resBycrypt){
                        return res.status(200).json({ 
                            'userId': userFound.id, 
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json({ 'erreur': 'mot de passe incorrect ! ' });
                    }
                });      
            } else {
                return res.status(404).json({ 'ereur': "L'utilisateur n'existe pas"});
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'ereur': "Impossible de vérifier si l'utilisateur existe"});
        });
    }
}


// http://localhost:8080/api/users/register
// http://localhost:8080/api/users/login