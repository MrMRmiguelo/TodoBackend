const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


mongoose.connect('mongodb+srv://adminDB:Df590G6QWhDV7hef@cluster0.bqvf7.mongodb.net/todoDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}, (err) => {
    if (!err) {
        console.log('Conexion establecida con la base')
    } else {
        console.log('Error en la conexion con la BD: ' + err)
    }
});
