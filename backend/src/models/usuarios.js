const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  currentXp: { type: Number, default: 0 },
  nivel: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', UsuarioSchema);