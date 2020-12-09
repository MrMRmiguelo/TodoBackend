const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
 
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        required:false,
    },
 

});

userSchema.statics.encriptarContraseña = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.compararContraseña = async (nuevaContraseña, password) => {  
    return await bcrypt.compareSync(nuevaContraseña, password);
};


module.exports = mongoose.model('User', userSchema);