const dialogs = require('./dialogs');
const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);
let rules = [
    "prob_sist_logistica",
    "prob_sist_logistica_login",
    "prob_sist_pereciveis",
    "prob_sist_sap",
    "prob_sist_sap_login",
    "problema_sistema",
    "reset_senha",
    "reset_senha_logistica",
    "reset_senha_sap",
    "root",
].map((m)=>require("./rules/"+m));

rules = flatten(rules);
module.exports={dialogs, rules};