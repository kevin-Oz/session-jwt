import mongoose from 'mongoose';

const roles = {
    values: ['ADMIN','USER'],
    message: 'invalid {VALUE} role'
};

const usuarioSchema = mongoose.Schema({
    username: {type: String, required: [true, 'username  is required']},
    email: {type: String, required: [true, 'Email  is required']},
    rol: {type: String, default: 'USER', enum: roles},
    activo: {type: Boolean, default: true},
    password: {type: String, required: [true, 'password is required']}
});

const usuario = mongoose.model('usuario', usuarioSchema);

export default usuario;
