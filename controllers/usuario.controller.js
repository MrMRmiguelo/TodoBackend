const Usuario = require("../models/Usuario.model");
const jwt = require("jsonwebtoken");
const secret = "jwt_y*)Jy*)JL,WnL,Wny*)JL,Wn"; //contraseña

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
