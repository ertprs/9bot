let sobreLais = require('./sobre-lais');
let funcionamento = require('./funcionamento');
let geral = require('./geral');
let problemaSistema = require('./problema-sistema');
let problemaSistemaPereciveis = require('./problema-sistema-pereciveis');
let problemaSistemaLogistica = require('./problema-sistema-logistica');

let tudo = []
    .concat(sobreLais)
    .concat(funcionamento)
    .concat(geral)
    .concat(problemaSistema)
    .concat(problemaSistemaPereciveis)
    .concat(problemaSistemaLogistica);

module.exports = tudo;

