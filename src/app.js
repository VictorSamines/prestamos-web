const express = require("express");
const app = express();
const mongoose = require("mongoose");
const clienteRouter = require("./routes/clientePrestamo.routes");
const { dataDB, info } = require("./helpers/helperApp");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

//Motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

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

app.use(clienteRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
