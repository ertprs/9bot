const dialogs = require('./dialogs');
const rules = [].concat([
    "root",
    "problema_sistema"
    ,"reset_senha"
    ,"reset_senha_sap"
    ].map((m)=>require("./rules/"+m))
);
module.exports={dialogs, rules};