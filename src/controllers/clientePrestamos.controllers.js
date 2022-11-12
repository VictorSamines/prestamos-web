const ClientePrestamos = require("../models/clientePrestamo");
const { dataDB, calcular, info } = require("../helpers/helperApp");

const getInfoPrestamos = async (req, res, next) => {
  try {
    const result = await ClientePrestamos.find().lean();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createClientePrestamo = async (req, res, next) => {
  const { monto, interes, periodo } = req.body;
  let montoFront = parseInt(monto, 10);
  let interesFront = parseInt(interes, 10) / 100;
  let periodoFront = parseInt(periodo, 10);
  calcular(montoFront, interesFront, periodoFront);
  // console.log(info);

  try {
    const clientePrestamoData = ClientePrestamos(req.body);
    // await clientePrestamoData.save();
    res.redirect("/");
    res.status(204);
  } catch (error) {
    next(error);
  }
};

module.exports = { getInfoPrestamos, createClientePrestamo };
