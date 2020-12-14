const { Router } = require('express');
const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/verificar');
const lista =  require('../controllers/lista.controller');
const Lista = require("../models/Lista.model");




//router.get('/',middleware.verificarJwt, lista.listar );
router.get('/:idTarea', middleware.verificarJwt, lista.listar );
router.get('/',middleware.verificarJwt, lista.tareas);
router.post('/crear_lista',middleware.verificarJwt, lista.crearListado);
router.put('/editar_lista/:idTarea', middleware.verificarJwt, lista.editarListado);
router.delete('/eliminar_lista/:idTarea',middleware.verificarJwt,lista.eliminarLista);
router.put('/actualizar_estado/:idTarea',middleware.verificarJwt,lista.actualizarEstado);
module.exports = router;