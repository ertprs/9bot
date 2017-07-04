const {get,add, clearAll} = require('./util');

module.exports = [
    {
        "id":"PLOG_login",
        "dialog":"prob_sist_logistica",
        "match":(c)=>{
            return get("entities.problema_sistema.0",c)==='login'
        },
        "actions":[
            {
                "replies": [
                    "Se não estiver consguindo logar no Logistica Reversa, posso realizar um reset de senha. Deseja realizar o reset?."
                ],
                "goToDialog":"prob_sist_logistica_login"
            }
        ]
    },
    {
        "id":"PLOG_problema_invalido",
        "dialog":"prob_sist_logistica",
        "priority":-1,
        "match":(c)=>{
            return get("entities.problema_sistema.0",c)!==null
        },
        "actions":[
            {
                "replies": [
                    "Infelizmente não sei como te ajudar com este problema no Logística Reversa. Me fale se precisar de ajuda com mais alguma coisa."
                ],
                "setContext":clearAll,
                "goToDialog":"ROOT"
            }
        ]
    }
];