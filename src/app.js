const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
  res.render("index")
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


//puerto que se va a ejecutar
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
