import { adminToken } from '../jwt/token'
/**
verificar si el usuario esta logeado
 */
const authentication = (request, response, next) =>{
    const token = request.get('token');
    adminToken.verificar(token, response, next);
}

/*
 verificando si es usuario es ADMIN
*/
const authorization = (request, response, next)=>{
    const data = request.usuario;
   if(data.rol==='ADMIN'){
       next();
   }else{
      return response.status(401).json({mensaje:'Error, no esta autorizado para realizar esta accion'});
   }
}

module.exports = { authorization, authentication }