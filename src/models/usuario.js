import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const roles = {
    values: ['ADMIN','USER'],
    message: 'invalid {VALUE} role'
};

const usuarioSchema = mongoose.Schema({
    username: {type: String, required: [true, 'username  is required']},
    email: {type: String, required: [true, 'Email  is required'], unique: true},
    rol: {type: String, default: 'USER', enum: roles},
    active: {type: Boolean, default: true},
    password: {type: String, required: [true, 'password is required']},
    date: {type: Date, default: Date.now()}
});

//para no devolver la contasenia
usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
usuarioSchema.plugin(uniqueValidator, { message: 'Error,se espera que {PATH} sea unico.' });
const usuario = mongoose.model('usuario', usuarioSchema);

export default usuario;
