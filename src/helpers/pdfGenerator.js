const PdfPrinter = require("pdfmake");
const fs = require("fs");
const fonts = require("./fonts");
const { clientePrestamosInfo } = require("./pdfContent");

const createFile = (docDefinition) => {
  const printer = new PdfPrinter(fonts);
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(__dirname + `/pdf/prestamo.pdf`));
  pdfDoc.end();
  console.log(`PDF generado correctamente prestamo.pdf`);
};
module.exports = createFile;
