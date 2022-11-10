const ClientePrestamos = require("../models/clientePrestamo");
const { info, dataDB, calcular } = require("../helpers/helperApp");
const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  try {
    const clientePrestamoData = ClientePrestamos(req.body);
    await clientePrestamoData.save();
    res.redirect("/");
    res.status(204);
  } catch (error) {
    next(error);
  }
};

const pdfGenerate = (req, res) => {
  res.send("PDF Generador");
  let docDefinition = {
    content: [
      {
        layout: "lightHorizontalLines", // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ["*", "auto", 100, "*"],
          body: [
            ["First", "Second", "Third", "The last one"],
            ["Value 1", "Value 2", "Value 3", "Value 4"],
            [{ text: "Bold value", bold: true }, "Val 2", "Val 3", "Val 4"],
          ],
        },
      },
    ],
  };
  pdfMake.createPdf(docDefinition).open();
};

module.exports = { getInfoPrestamos, createClientePrestamo, pdfGenerate };
