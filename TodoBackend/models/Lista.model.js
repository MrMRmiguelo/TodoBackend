const mongoose = require('mongoose');


var listaSchema = new mongoose.Schema({

    
    tarea:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    detalleTarea:{
        type:String,
        required:true,
    },
    completado:{
        type:Boolean,
        required:false,
        default: false,
    },
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Usuario",
    },
       
    
});


module.exports = mongoose.model('Lista', listaSchema);