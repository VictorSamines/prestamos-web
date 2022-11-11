const express = require("express");
const app = express();
const mongoose = require("mongoose");
const clienteRouter = require("./routes/clientePrestamo.routes");
const ClientePrestamos = require("./models/clientePrestamo");
const { dataDB, dataPdf, calcular, info } = require("./helpers/helperApp");
const createFile = require("./helpers/pdfGenerator");
const {
  docDefinition,
  llenarClientePrestamosInfo,
} = require("./helpers/pdfContent");
const fs = require("fs");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

//Motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//PDF

app.get("/pdf", (req, res) => {
  let pdf = __dirname + "/helpers/pdf/Victor Samines.pdf";
  fs.access(pdf, fs.constants.F_OK, (err) => {
    console.log(`${pdf} ${err ? "no existe" : "existe"}`);
  });

  fs.readFile(pdf, function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plane" });
      return res.end("404 not found");
    }
    res.writeHead(200, { Content_Type: "application/pdf" });
    res.write(data);
    return res.end();
  });
});

app.use(express.static(__dirname + "/public"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a mongoDB correctamente"))
  .catch((err) => console.log(err));

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.get("/", (req, res, next) => {
  res.render("index2", {
    dataDB,
    info,
    titulo: "Calculo de Intereses Prestamos Sobre Saldo",
  });
});

app.post("/cliente-prestamo", async (req, res, next) => {
  const { nombre, direccion, telefono, dpi, monto, interes, periodo } =
    req.body;
  console.log(nombre, direccion, telefono, dpi, monto, interes, periodo);
  let montoFront = parseInt(monto, 10);
  let interesFront = parseInt(interes, 10) / 100;
  let periodoFront = parseInt(periodo, 10);
  calcular(montoFront, interesFront, periodoFront);
  llenarClientePrestamosInfo(
    nombre,
    direccion,
    telefono,
    dpi,
    monto,
    interes,
    periodo
  );
  createFile(docDefinition);
  // console.log(info);

  try {
    const clientePrestamoData = ClientePrestamos(req.body);
    await clientePrestamoData.save();
    res.redirect("/cliente-prestamo");
    res.status(204);
  } catch (error) {
    next(error);
  }
});

app.get("/cliente-prestamo", (req, res, next) => {
  try {
    res.render("index2", {
      dataDB,
      titulo: "Calculo de Intereses Prestamos Sobre Saldo",
    });
  } catch (error) {
    next(error);
  }
});

app.use(clienteRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
