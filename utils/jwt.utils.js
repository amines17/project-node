// Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN = '$2b$05$M25WCDTzKTevimw9anSOOOSIBmo8IJLSPODvd1M5nOMDqCRYhKg3u';

//Exported functions
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN,
        {
            expiresIn: '1h'
        })
    }
}