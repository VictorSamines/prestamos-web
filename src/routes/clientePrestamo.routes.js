const Router = require("express");
const {
  getInfoPrestamos,
  createClientePrestamo,
  pdfGenerate,
} = require("../controllers/clientePrestamos.controllers");

const clienteRouter = Router();

clienteRouter.get("/cliente-prestamo", getInfoPrestamos);
clienteRouter.get("/cliente-prestamos", getInfoPrestamos);
// clienteRouter.get("/cliente/:id", getCliente);
clienteRouter.post("/cliente-prestamo", createClientePrestamo);

module.exports = clienteRouter;
