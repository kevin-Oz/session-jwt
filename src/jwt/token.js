const jwt = require('jsonwebtoken');
const secret = "secreto";
/*
 Object Literals para la administracion del token
*/
const adminToken = {
    /*
    generando un token con expiracion de una hora
    */
    generar: (data)=>{
        return jwt.sign({
            data
          }, secret, { expiresIn: 60 * 60 }); 
    },

    /**
     * verficando si el token es valido.
     */
    verificar: (request,token, response, next)=>{
        jwt.verify(token, secret,(error, decoded)=>{
            if(error){
                return response.status(400).json({mensaje:"usuario no válido"});
            }
            request.usuario = decoded.data;
            next();
        });
    }
}

module.exports = {adminToken}