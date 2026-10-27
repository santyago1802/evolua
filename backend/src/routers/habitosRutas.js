const express = require('express');
const router = express.Router();
const { 
  obtenerHabitos, 
  crearHabito, 
  actualizarHabito, 
  eliminarHabito 
} = require('./controllers/habitoscontrollers');

router.get('/', obtenerHabitos);
router.post('/', crearHabito);
router.put('/:id', actualizarHabito);
router.delete('/:id', eliminarHabito);

module.exports = router;