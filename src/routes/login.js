import express from 'express';
const router = express.Router();
import { adminToken } from '../jwt/token'

import userModel from '../models/usuario';

router.post('/login', async (request, response)=>{
    const body = request.body;
    try {
        const usuarioDb = await userModel.findOne({email: body.email});
        if(!usuarioDb){
          return  response.status(400).json({mesaje:'usuario no existe'});
        }
        const token = adminToken.generar(usuarioDb);
        response.status(200).json({data:usuarioDb,token});
    } catch (error) {
        return  response.status(400).json({mesaje:'ocurrio un error'});
    }
});
















module.exports = router;

