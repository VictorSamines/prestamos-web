const styles = require("./styles");
const info = require("./fillData");

//Objeto Datos personales del solicitante
const clientePrestamosInfo = {
  nombre: "",
  direccion: "",
  telefono: "",
  dpi: "",
  monto: 0,
  interes: 0,
  periodo: 0,
};

const llenarClientePrestamosInfo = (
  nombre = "",
  direccion = "",
  telefono = 0,
  dpi = 0,
  monto = 0,
  interes = 0,
  periodo = 0
) => {
  clientePrestamosInfo.nombre = nombre;
  clientePrestamosInfo.direccion = direccion;
  clientePrestamosInfo.telefono = telefono;
  clientePrestamosInfo.dpi = dpi;
  clientePrestamosInfo.monto = monto;
  clientePrestamosInfo.interes = interes;
  clientePrestamosInfo.periodo = periodo;
};

//Contenido de la tabla la tabla
const docDefinition = {
  content: [
    { text: "PRESTAMO SOBRE SALDOS", style: "header" },
    "\n",
    "\n",
    { text: `Nombre: ${clientePrestamosInfo.nombre}`, style: "label" },
    { text: `Dirección: ${clientePrestamosInfo.direccion}`, style: "label" },
    { text: `Teléfono: ${clientePrestamosInfo.telefono}`, style: "label" },
    { text: `DPI: ${clientePrestamosInfo.dpi}`, style: "label" },
    "\n",
    { text: `Monto: Q.${clientePrestamosInfo.monto}`, style: "label" },
    { text: `Intereses: ${clientePrestamosInfo.interes}%`, style: "label" },
    { text: `Periodo: ${clientePrestamosInfo.periodo} años`, style: "label" },
    {
      text: `Periodo en meses: ${clientePrestamosInfo.periodo * 12} meses`,
      style: "label",
    },
    "\n",
    {
      layout: "lightHorizontalLines", // optional
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: ["*", "auto", 100, "*", "*"],

        body: info,
      },
    },
  ],
  defaultStyle: {
    font: "Times",
  },
  styles: styles,
};

module.exports = {
  clientePrestamosInfo,
  docDefinition,
  llenarClientePrestamosInfo,
};
