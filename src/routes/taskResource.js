import express from 'express';
import { authentication } from '../middleware/auth';
const router = express.Router();
import taskModel from '../models/task';


/*busqueda de tarea por identificador. */
router.get('/task/:id', authentication, async(request, response) => {
    const _id = request.params.id;
  try {
    const jsonBody = await taskModel.findById(_id);
	  response.status(200).json(jsonBody);
  }catch(error){
    return response.status(404).json({
	  mensaje: 'Ocurrio un error al buscar tarea',error
	});
  }
});

/* listar todas las tareas referentes a un usuario.*/
router.get('/task', authentication, async(request, response) => {
  try {
    const jsonBody = await taskModel.find();
	  response.status(200).json(jsonBody);
  }catch(error){
	  return response.status(500).json({
	  mensaje: 'Ocurrio un error',error
	});
  }
});

/**Crear tarea  */
router.post('/task',authentication, async(request, response) => {
  const body = request.body;
  try {
  const jsonBody = await taskModel.create(body);
  response.status(201).json(jsonBody);
}catch(error){
  return response.status(400).json({
  mensaje: 'Ocurrio un error al registrar la tarea',error
});
}
});

/**Editar tarea */
router.put('/task/:id',authentication,async(request, response) => {
  const _id = request.params.id;
  const body = request.body;
try {
  const jsonBody = await taskModel.findByIdAndUpdate(_id,body,{new:true});
  response.status(200).json(jsonBody);
}catch(error){
  return response.status(400).json({
  mensaje: 'Ocurrio un error al modificar la tarea',error
});
}
});

/**Eliminar tarea */
router.delete('/usuario/:id',authentication, async(request, response) => {
  const _id = request.params.id;
try {
  const jsonBody = await taskModel.findByIdAndRemove(_id);
  response.status(200).json(jsonBody);
}catch(error){
  return response.status(500).json({
  mensaje: 'Ocurrio un error al eliminar la tarea',error
});
}
});

module.exports = router;