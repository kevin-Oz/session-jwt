import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
const app = express();
// Para acceder al directorio actual
const path = require('path');
//conector a base de datos mongo
const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/registros', {useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',()  => {
  console.log("conectado a MongoDB");
});

app.use('/api', require('./src/routes/usuarioResource'));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('server listening on port '+ app.get('puerto'));
});

