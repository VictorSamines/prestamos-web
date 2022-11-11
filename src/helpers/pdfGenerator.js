const PdfPrinter = require("pdfmake");
const fs = require("fs");
const fonts = require("./fonts");
const { clientePrestamosInfo } = require("./pdfContent");

const createFile = (docDefinition) => {
  const printer = new PdfPrinter(fonts);
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(
    fs.createWriteStream(__dirname + `/pdf/${clientePrestamosInfo.nombre}.pdf`)
  );
  pdfDoc.end();
  console.log(`PDF generado correctamente ${clientePrestamosInfo.nombre}.pdf`);
};
module.exports = createFile;
