
let sobreLais = require('./sobre-lais');
let funcionamento = require('./funcionamento');
let geral = require('./geral');
let problemaSistema = require('./problema-sistema');
let problemaSistemaPereciveis = require('./problema-sistema-pereciveis');
let problemaSistemaLogistica = require('./problema-sistema-logistica');
let problemaSistemaWebLoja = require('./problema-sistema-webloja');
let problemaSistemaOper = require('./problema-sistema-oper');
let ofensa = require('./ofensa');
let infoLoja = require('./loja-info');
let saudacao = require('./saudacao');
let problemaLoja = require('./problema-pdv');

let tudo = []
    .concat(sobreLais)
    .concat(saudacao)
    .concat(funcionamento)
    .concat(geral)
    .concat(problemaSistema)
    .concat(problemaSistemaPereciveis)
    .concat(problemaSistemaLogistica)
    .concat(problemaSistemaOper)
    .concat(problemaSistemaWebLoja)
    .concat(problemaLoja)
    .concat(ofensa)
    .concat(infoLoja);
module.exports = tudo;

