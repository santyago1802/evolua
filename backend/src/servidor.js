const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const conectarDB = require('./config/db');
const habitosRutas = require('./routers/habitosRutas');

dotenv.config();
conectarDB();

const app = express();

app.use(express.json());
app.use(cors());

// Rutas de la API
app.use('/api/habitos', habitosRutas);

app.get('/', (req, res) => {
  res.json({ message: 'API de evolúa activa 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});