const mongoose = require("mongoose");

const clientePrestamoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  dpi: {
    type: String,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  interes: {
    type: Number,
    required: true,
  },
  periodo: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("cliente-prestamos", clientePrestamoSchema);
