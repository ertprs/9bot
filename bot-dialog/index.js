let sobreLais = require('./sobre-lais');
let funcionamento = require('./funcionamento');
let geral = require('./geral');
let problemaSistema = require('./problema-sistema');
let problemaSistemaPereciveis = require('./problema-sistema-pereciveis');
let problemaSistemaLogistica = require('./problema-sistema-logistica');
let ofensa = require('./ofensa');
let infoLoja = require('./loja-info');
let saudacao = require('./saudacao');

let tudo = []
    .concat(sobreLais)
    .concat(saudacao)
    .concat(funcionamento)
    .concat(geral)
    .concat(problemaSistema)
    .concat(problemaSistemaPereciveis)
    .concat(problemaSistemaLogistica)
    .concat(ofensa)
    .concat(infoLoja);
module.exports = tudo;

