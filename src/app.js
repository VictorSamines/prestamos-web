const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
// template engine
app.set('view engine', 'ejs')
// specify the views directory
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + '/public'))
// Sirve para trabajar con solicitudes put o post
// porque en ambas solicitudes está enviando datos (en forma de algún objeto de datos)
// al servidor y le está pidiendo al servidor que acepte o almacene esos datos (objeto),
// que se incluye en el cuerpo (es decir req.body) de esa solicitud (POST o PUT)
// app.use(express.json());

// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
 res.render("index", { titulo: 'EJS jefferson'})
});

app.get('/help', (req, res) => {
  res.render("help", { titulo: 'Ayuda acerca del préstamo' })
})

app.get("/Formulario", (req, res) => {
  res.render("Formulario")
})

app.get("/Prestamo_Registrado", (req, res) => {
  res.render("Prestamo_Registrado")
})

//pagina de 404 -Pagine not found
app.get('*', (req,res)=>{
  res.render('404')
}) 

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
