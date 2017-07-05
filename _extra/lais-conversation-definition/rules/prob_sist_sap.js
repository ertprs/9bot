const {get,add, clearAll} = require('./util');

module.exports = [
    {
        "id":"PSAP_login",
        "dialog":"prob_sist_sap",
        "match":(c)=>{
            return get("entities.problema_sistema.0",c)==='login'
        },
        "actions":[
            {
                "replies": [
                    "Se não estiver consguindo logar no SAP, posso realizar um reset de senha. Deseja realizar o reset?."
                ],
                "goToDialog":"prob_sist_sap_login"
            }
        ]
    },

    {
        "id":"PSAP_problema_invalido",
        "dialog":"prob_sist_sap",
        "priority":-1,
        "match":(c)=>{
            return get("entities.problema_sistema.0",c)!==null
        },
        "actions":[
            {
                "replies": [
                    "Infelizmente não sei como te ajudar com este problema no SAP. Me fale se precisar de ajuda com mais alguma coisa."
                ],
                "setContext":clearAll,
                "goToDialog":"ROOT"
            }
        ]
    }
];