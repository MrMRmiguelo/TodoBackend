
const Usuario = require('../models/Usuario.model');
const jwt = require('jsonwebtoken');
const secret = 'jwt_y*)Jy*)JL,WnL,Wny*)JL,Wn';//contraseña

exports.verificarJwt = async(req, res, next) => {
    
    if (!req.headers.authorization) {
        res.status(403).json({'mensaje':'No se encontro un token'});
 
    }
    else{
               //Bearer <token>
               const token = req.headers.authorization.split(" ")[1];
               const datos = jwt.verify(token, secret);
               const id = datos._id;
               const usuarioId = await Usuario.findById(id, { password: 0 });
       
               if (!usuarioId) {
                   res.status(403).json({'mensaje':'No se encontro el usuario'});
               } else {
                   next();
               }
       
    }

}