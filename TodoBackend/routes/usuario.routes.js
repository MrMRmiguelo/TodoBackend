const { Router } = require('express');
const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuario.controller');


router.post('/login', usuario.login);
router.post('/register', usuario.register);

router.get('/', (req, res) => {
    res.send('okUsuario');
});

router.post('/reestablecer', usuario.postReestablecer);

router.post('/reestablecer/:token', usuario.reestablecercontrasena);
router.get('/verificar/:token', usuario.verificarToken);


module.exports = router;
