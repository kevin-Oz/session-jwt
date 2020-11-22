const { request } = require('express');
const jwt = require('jsonwebtoken');
/*
 Object Literals para la administracion del token
*/
const adminToken = {
    generar: (data)=>{
        return jwt.sign({
            data
          }, 'secret', { expiresIn: 60 * 60 }); 
    },

    verificar: (token, response, next)=>{
        jwt.verify(token, 'secret',(error, decoded)=>{
            if(error){
                return response.status(400).json({mensaje:"usuario no válido"});
            }
            request.usuario = decoded.data;
            next();
        });
    }
}

module.exports = {adminToken}