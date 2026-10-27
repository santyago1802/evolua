const Habito = require('../models/Habito');

// Obtener todos los hábitos
exports.obtenerHabitos = async (req, res) => {
  try {
    const habitos = await Habito.find();
    res.json(habitos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los hábitos' });
  }
};

// Crear un hábito
exports.crearHabito = async (req, res) => {
  try {
    const nuevoHabito = new Habito(req.body);
    await nuevoHabito.save();
    res.json(nuevoHabito);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el hábito' });
  }
};

// Actualizar hábito (completar / revertir)
exports.actualizarHabito = async (req, res) => {
  try {
    const habitoActualizado = await Habito.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(habitoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el hábito' });
  }
};

// Eliminar hábito
exports.eliminarHabito = async (req, res) => {
  try {
    await Habito.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hábito eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el hábito' });
  }
};