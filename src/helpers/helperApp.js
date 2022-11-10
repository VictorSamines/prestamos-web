//Archivo de ayuda
let dataPdf = [
  {
    mes: { text: "MES", bold: true },
    intereses: { text: "INTERESES", bold: true },
    amortizacion: { text: "AMORTIZACIÓN", bold: true },
    total: { text: "TOTAL", bold: true },
    saldo: { text: "SALDO", bold: true },
  },
];
//Data para la db
let dataDB = [];
//Data informacion para el PDF
let info = [];

// const monto = 100000;
// const intAnual = 5 / 100;
// const periodo = 2;

let mesesArray = [];
let saldoArray = [];
let amortizacionArray = [];
let interesesArray = [];
let totalArray = [];

const calcular = async (monto, intAnual, periodo) => {
  saldoArray.push(monto);

  // Meses sirve para saber la cantidad de veces a iterar
  let meses = periodo * 12;
  // **** Meses ****
  for (let i = 1; i <= meses; i++) {
    mesesArray.push(i);
  }

  // **** Amortización de capital ****
  // Amortización = monto / cantidad de meses (es una constante)
  let resultadoAmortizacion;
  for (let i = 1; i <= meses; i++) {
    resultadoAmortizacion = monto / meses;
    amortizacionArray.push(resultadoAmortizacion);
  }

  // **** Saldo ****
  // Saldo = saldo [i] - amortización de capital
  for (let i = 0; i <= meses; i++) {
    let valor = monto;
    // Desde el monto inicial hasta 0
    while (valor >= resultadoAmortizacion) {
      const nuevo = (valor -= resultadoAmortizacion);
      saldoArray.push(nuevo);
    }
  }

  saldoArray.push(0);
  // deja solo los valores que no se repiten
  let resultadoSaldo = saldoArray.reduce((a, e) => {
    if (!a.find((d) => d == e)) {
      a.push(e);
    }
    return a;
  }, []);

  // intereses pagados
  // Intereses pagados varía = Saldo pendiente * porcentaje mensual (hay que iterar)
  for (let i = 0; i <= meses; i++) {
    let interes = 0;
    interes = (resultadoSaldo[i] * intAnual) / 12;
    interesesArray.push(interes);
  }
  //Total
  // Total = amortización + intereses pagados
  for (let i = 1; i <= meses; i++) {
    let total = 0;
    total = interesesArray[i - 1] + resultadoAmortizacion;
    totalArray.push(total);
  }

  //Bucle para llenar los datos del pdf
  for (let i = 0; i < mesesArray.length; i++) {
    dataPdf.push({
      mes: mesesArray[i],
      intereses: interesesArray[i].toFixed(2),
      amortizacion: amortizacionArray[i].toFixed(2),
      total: totalArray[i].toFixed(2),
      saldo: resultadoSaldo[i].toFixed(2),
    });
  }
  //Data para información del PDF

  for (let i = 0; i < dataPdf.length; i++) {
    info.push([]);
    info[i].push(dataPdf[i].mes);
    info[i].push(dataPdf[i].intereses);
    info[i].push(dataPdf[i].amortizacion);
    info[i].push(dataPdf[i].total);
    info[i].push(dataPdf[i].saldo);
  }

  //Bucle para llenar los datos para ingresar en la
  for (let i = 0; i < mesesArray.length; i++) {
    dataDB.push({
      mes: mesesArray[i],
      amortizacion: amortizacionArray[i].toFixed(2),
      total: totalArray[i].toFixed(2),
      saldo: resultadoSaldo[i].toFixed(2),
      intereses: interesesArray[i].toFixed(2),
    });
  }
};
module.exports = { dataPdf, dataDB, calcular, info };
