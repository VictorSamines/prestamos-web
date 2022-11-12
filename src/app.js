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
// template engine
app.set("view engine", "ejs");
// specify the views directory
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));
// Sirve para trabajar con solicitudes put o post
// porque en ambas solicitudes está enviando datos (en forma de algún objeto de datos)
// al servidor y le está pidiendo al servidor que acepte o almacene esos datos (objeto),
// que se incluye en el cuerpo (es decir req.body) de esa solicitud (POST o PUT)
// app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", { titulo: "Prestamo Sobre Saldo" });
});

app.get("/help", (req, res) => {
  res.render("help", { titulo: "Ayuda acerca del préstamo" });
});

app.get("/Formulario", (req, res) => {
  res.render("Formulario", {
    dataDB,
  });
});

app.get("/Prestamo_Registrado", async (req, res, next) => {
  try {
    const result = await ClientePrestamos.find().lean();
    console.log(result);
    res.render("Prestamo_Registrado", {
      result,
    });
  } catch (error) {
    next(error);
  }
});

//pagina de 404 -Pagine not found
app.get("*", (req, res) => {
  res.render("404");
});
//PDF

// app.get("/pdf", (req, res) => {
//   let pdf = __dirname + "/helpers/pdf/prestamo.pdf";
//   fs.access(pdf, fs.constants.F_OK, (err) => {
//     console.log(`${pdf} ${err ? "no existe" : "existe"}`);
//   });

//   fs.readFile(pdf, function (err, data) {
//     if (err) {
//       res.writeHead(404, { "Content-Type": "text/plane" });
//       return res.end("404 not found");
//     }
//     res.writeHead(200, { "Content-Type": "application/pdf" });
//     res.write(data);
//     return res.end();
//   });
// });

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

app.post("/cliente-prestamo", async (req, res, next) => {
  const { nombre, telefono, direccion, dpi, monto, periodo, interes } =
    req.body;
  let montoFront = parseInt(monto, 10);
  let interesFront = parseInt(interes, 10) / 100;
  let periodoFront = parseInt(periodo, 10);
  calcular(montoFront, interesFront, periodoFront);
  // llenarClientePrestamosInfo(
  //   nombre,
  //   direccion,
  //   telefono,
  //   dpi,
  //   monto,
  //   interes,
  //   periodo
  // );
  // createFile(docDefinition);
  // console.log(dataDB);

  try {
    const clientePrestamoData = ClientePrestamos(req.body);
    await clientePrestamoData.save();
    res.redirect("/Formulario");
    res.status(204);
  } catch (error) {
    next(error);
  }
});

// app.get("/Formulario", (req, res, next) => {
//   try {
//     res.render("Formulario", {
//       dataDB,
//       titulo: "Calculo de Intereses Prestamos Sobre Saldo",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
