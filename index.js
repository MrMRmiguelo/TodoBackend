const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const usuarioRouter = require('./routes/usuario.routes');
const listaRouter = require('./routes/lista.routes');
require('./config/database');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use('/api/usuario',usuarioRouter);
app.use('/api/lista',listaRouter);



app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});

