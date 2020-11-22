import express from 'express';
import { authentication, authorization } from '../middleware/auth';
const router = express.Router();
import usuarioModel from '../models/usuario';

const bcrypt = require('bcrypt');
const saltRounds = 10;


/*busqueda de usuario por identificador. */
router.get('/usuario/:id', async(request, response) => {
    const _id = request.params.id;
  try {
    const jsonBody = await usuarioModel.findById(_id);
	  response.status(200).json(jsonBody);
  }catch(error){
    return response.status(404).json({
	  mensaje: 'Ocurrio un error al buscar el usuario',error
	});
  }
});

/* listar todos los usuarios.*/
router.get('/usuarios', async(request, response) => {
    const body = request.body;
  try {
    const jsonBody = await usuarioModel.find();
	  response.status(200).json(jsonBody);
  }catch(error){
	  return response.status(500).json({
	  mensaje: 'Ocurrio un error',error
	});
  }
});

/**Crear usuario */
router.post('/usuario', async(request, response) => {
  const body = request.body;
  body.password = bcrypt.hashSync(request.body.password, saltRounds);
  try {
  const jsonBody = await usuarioModel.create(body);
  response.status(201).json(jsonBody);
}catch(error){
  return response.status(400).json({
  mensaje: 'Ocurrio un error al registrar el usuario',error
});
}
});

/**Editar usuario */
router.put('/usuario/:id',authentication,async(request, response) => {
  const _id = request.params.id;
  const body = request.body;
try {
  const jsonBody = await usuarioModel.findByIdAndUpdate(_id,body,{new:true});
  response.status(200).json(jsonBody);
}catch(error){
  return response.status(400).json({
  mensaje: 'Ocurrio un error al modificar el usuario',error
});
}
});

/**Eliminar usuario (solo para ADMIN ) */
router.delete('/usuario/:id',[authentication, authorization], async(request, response) => {
  const _id = request.params.id;
try {
  const jsonBody = await usuarioModel.findByIdAndRemove(_id);
  response.status(200).json(jsonBody);
}catch(error){
  return response.status(500).json({
  mensaje: 'Ocurrio un error al eliminar el usuario',error
});
}
});

module.exports = router;