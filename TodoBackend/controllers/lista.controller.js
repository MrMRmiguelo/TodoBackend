const Lista = require("../models/Lista.model");
const jwt = require("jsonwebtoken");
const secret = "jwt_y*)Jy*)JL,WnL,Wny*)JL,Wn"; //contraseña

function obtenerId(req) {
  const token = req.headers.authorization.split(" ")[1];
  const datos = jwt.verify(token, secret);
  return datos._id;
}

exports.listar = async (req, res) => {
  try {
    console.log("tarea");
    const { idTarea } = req.params;
    const listar = await Lista.findById(idTarea);
    if (!listar || listar.usuario != obtenerId(req)) {
      res.status(400).json({ mensaje: "No se encontro una lista con ese Id" });
    } else {
      res.json(listar);
    }
  } catch (error) {
    res.status(400).json({ mensaje: "Error en encontrar la tarea" });
  }
};

exports.tareas = async (req, res) => {
  try {
    console.log("tareas");
    const listado = await Lista.find();
    res.status(200).json(listado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error en encontrar las tareas" });
  }
};

exports.crearListado = async (req, res) => {
  try {
    console.log(req.body);
    const { tarea, detalleTarea } = req.body;
    const listado = new Lista({
      tarea,
      detalleTarea,
      usuario: await obtenerId(req),
    });
    const nuevoListado = await listado.save();

    if (!nuevoListado) {
      res.status(400).json({ mensaje: "Error al guardar la tarea" });
    } else {
      res.status(200).json(nuevoListado);
    }
  } catch (error) {
    res.status(400).json({ mensaje: "Error en conexion guardar tarea" });
  }
};

exports.editarListado = async (req, res) => {
  try {
    const { idTarea } = req.params;
    const { tarea, detalleTarea } = req.body;
    const listado = await Lista.findByIdAndUpdate(idTarea, {
      tarea,
      detalleTarea,
    });
    if (!listado) {
      res.status(400).json({ mensaje: "No se encontro una lista con ese Id" });
    } else {
      res.status(200).json({ Respuesta: "Lista editada" });
    }
  } catch (error) {
    res.status(400).json({ mensaje: "Error en editar la tarea" });
  }
};

exports.eliminarLista = async (req, res) => {
  try {
    const { idTarea } = req.params;
    const listaBorrar = await Lista.findByIdAndDelete(idTarea);

    if (!listaBorrar) {
      res.status(400).json({ mensaje: "No se encontro la tarea" });
    } else {
      res.status(200).json({ Respuesta: "Lista eliminada" });
    }
  } catch (error) {
    res.status(400).json({ mensaje: "Error en encontrar eliminar la tarea" });
  }
};

exports.actualizarEstado = async (req, res) => {
  try {
    const { idTarea } = req.params;
    const listar = await Lista.findById(idTarea);
    if (!listar || listar.usuario != obtenerId(req)) {
      res.status(400).json({ mensaje: "Error al actualizar la tarea" });
    } else {
      const nuevaLista = await Lista.findByIdAndUpdate(idTarea,{completado:!listar.completado})
      if (!nuevaLista) {
        res.status(400).json({ mensaje: "Error al actualizar la tarea" });
      } else {
        res.status(200).json({mensaje: "Tarea Actualizada"});
      }
    }
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar la tarea" });
  }
};
