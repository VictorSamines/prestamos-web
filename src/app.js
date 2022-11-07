const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json()); //req. body

app.get("/", (req, res) => {
  res.send("Pagina de Inicio");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
