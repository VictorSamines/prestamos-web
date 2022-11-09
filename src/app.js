const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
// template engine
app.set('view engine', 'ejs')
// specify the views directory
app.set('views', __dirname + '/views')

app.use(express.static('public'))
//middleware -> express.json()
// Sirve para trabajar con solicitudes put o post
// porque en ambas solicitudes está enviando datos (en forma de algún objeto de datos)
// al servidor y le está pidiendo al servidor que acepte o almacene esos datos (objeto),
// que se incluye en el cuerpo (es decir req.body) de esa solicitud (POST o PUT)
// app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", { titulo: 'EJS jefferson'})
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
