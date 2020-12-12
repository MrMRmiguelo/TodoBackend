const Usuario = require("../models/Usuario.model");
const jwt = require("jsonwebtoken");
const secret = "jwt_y*)Jy*)JL,WnL,Wny*)JL,Wn"; //contraseña
const nodemailer = require('../config/nodemailer');
const crypto = require('crypto');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const nuevoUsuario = new Usuario({
      email,
      password: await Usuario.encriptarContraseña(password),
    });
    const usuarioGuardado = nuevoUsuario.save();
    const token = jwt.sign(
      {
        _id: usuarioGuardado.id,
      },
      secret,
      { expiresIn: "7d" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.json(error);
  }
};

/*exports.login = async (req, res) => {
  const token = jwt.sign(
    {
      _id: "1",
    },
    secret,
    { expiresIn: "7d" }
  );
  console.log(token);

  res.status(201).json({ token });
};*/

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      res.status(400).json({ mensaje: "No se encontro una cuenta" });
    } else {
      const comparar = await Usuario.compararContraseña(
        password,
        usuario.password
      );
      if (!comparar) {
        res
          .status(401)
          .json({ mensaje: "La contraseña o el usuario son incorrectos" });
      } else {
        const token = jwt.sign(
          {
            _id: usuario.id,
          },
          secret,
          { expiresIn: "7d" }
        );
        res.status(200).json({ token });
      }
    }
  } catch (error) {
    res.json(error);
  }
};


exports.postReestablecer = async (req, res) => {
  try {
    const { email } = req.body;
    //no busca la contraseña
    const usuario = await Usuario.findOne({ email }, { password: 0 });

    if (!usuario) {
      res
        .status(400)
        .json({
          mensaje: "No se encontro una cuenta con este correo electronico",
        });
    } else {
      const nuevoToken = await crypto.randomBytes(20).toString("hex");
      const nuevoUsuario = await Usuario.findByIdAndUpdate(usuario.id, {
        token: nuevoToken, });
      const Url = `http://localhost:4200/reset_password/${nuevoUsuario.token}`;

      const mail = {
        from: "ma_valdeza@unicah.edu",
        to: usuario.email,
        subject: "Reestablecer tu cuenta <NOREPLY>",
        text:
          "Hola,\n\n" +
          "Por favor, para reestablecer su cuenta haga click en este link:\n\n" +
          Url +
          ".\n",
        html:
          "Hola,<br><br>" +
          "Por favor, para reestablecer su cuenta haga click en este link:<br><br>" +
          '<a href="' +
          Url +
          '" target="_blank">Activar Usuario</a>.<br>',
      };
      await nodemailer.sendMail(mail);
      res.status(200).json({ Mensaje: "Su correo fue enviado exitosamente" });
    }
  } catch (error) {
    res.json(error);
  }
};


//accion de cambiar contraseña
exports.reestablecercontrasena = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    //no busca la contraseña
    const usuario = await Usuario.findOne({ token }, { password: 0 });

    if (!usuario) {
      res.status(400).json({ mensaje: "No se encontro un token" });
    } else {
      await Usuario.findByIdAndUpdate( usuario.id , { password: await Usuario.encriptarContraseña(password), token: null });
      
      res.status(200).json({'Mensaje':'Se ha reestablecido la contraseña exitosamente'});
      
    }
  } catch (error) {
    res.json(error);
  }
};

exports.verificarToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    //no busca la contraseña
    const usuario = await Usuario.findOne({ token }, { password: 0 });

    if (!usuario) {
      res.status(400).json({ mensaje: "No se encontro un token" });
    } else {
      
      res.status(200).json({'Mensaje':'El token es valido'});
      
    }
  } catch (error) {
    res.json(error);
  }
};

