const { Router } = require('express');
const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/verificar');
const lista =  require('../controllers/lista.controller');




router.get('/',middleware.verificarJwt, lista.listar );

module.exports = router;