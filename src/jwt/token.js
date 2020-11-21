const jwt = require('jsonwebtoken');

/*
patron Object Literals para la administracion de tokens
*/
const adminToken = {
    generar: (data)=>{
        return jwt.sign({
            data
          }, 'secret', { expiresIn: 60 * 60 }); 
    },

    verificar: (token)=>{
        console.log(token)
    }
}

module.exports = {adminToken}