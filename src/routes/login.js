import express from 'express';
const router = express.Router();
import { adminToken } from '../jwt/token'

const bcrypt = require('bcrypt');
import userModel from '../models/usuario';

/**
 * generando ruta de logeo y asignandole un token a su sesion
 */
router.post('/login', async (request, response)=>{
    const body = request.body;
    try {
        const usuarioJson = await userModel.findOne({email: body.email});
        if(!usuarioJson){
          return  response.status(400).json({mesaje:'el usuario no existe'});
        }

        if(!bcrypt.compareSync(body.password, usuarioJson.password)){
          return  response.status(400).json({mesaje:'usuario o contraseña incorrectos'});
        }
        const token = adminToken.generar(usuarioJson);
        response.status(200).json({data:usuarioJson, token});
    } catch (error) {
        return  response.status(400).json({mesaje:'ocurrio un error'});
    }
});
















module.exports = router;

