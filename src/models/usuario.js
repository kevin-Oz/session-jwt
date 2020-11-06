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
    password: {type: String, required: [true, 'password is required']},
    fecha: {type: Date, default: Date.now()}
});

//para no devolver la contasenia
usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
const usuario = mongoose.model('usuario', usuarioSchema);

export default usuario;
