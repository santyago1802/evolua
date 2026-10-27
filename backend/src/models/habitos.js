const mongoose = require('mongoose');

const HabitoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  categoria: { type: String, required: true },
  xp: { type: Number, default: 40 },
  completado: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Habito', HabitoSchema);