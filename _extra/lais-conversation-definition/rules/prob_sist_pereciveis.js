const {get,add, clearAll} = require('./util');

module.exports = [
    {
        "id":"PPER_login",
        "dialog":"prob_sist_pereciveis",
        "match":(c)=>{
            return get("entities.problema_sistema.0",c)==='login'
        },
        "actions":[
            {
                "replies": [
                    "PROCEDIMENTO DE LOGIN."
                ],
                "setContext":clearAll,
                "goToDialog":"ROOT"
            }
        ]
    },

    {
        "id":"PPER_camera",
        "dialog":"prob_sist_pereciveis",
        "match":(c)=>{
            return get("entities.problema_sistema.0",c)==='camera'
        },
        "actions":[
            {
                "replies": [
                    "PROCEDIMENTO DE CAMERA."
                ],
                "setContext":clearAll,
                "goToDialog":"ROOT"
            }
        ]
    },
    {
        "id":"PPER_sincronizacao",
        "dialog":"prob_sist_pereciveis",
        "match":(c)=>{
            return get("entities.problema_sistema.0",c)==='sincronizacao'
        },
        "actions":[
            {
                "replies": [
                    "PROCEDIMENTO DE SINCRONIZACAO."
                ],
                "setContext":clearAll,
                "goToDialog":"ROOT"
            }
        ]
    },
    {
        "id":"PPER_invalido",
        "dialog":"prob_sist_pereciveis",
        "priority":-1,
        "match":(c)=>{
            return get("entities.problema_sistema.0",c)!==null
        },
        "actions":[
            {
                "replies": [
                    "Infelizmente não sei como te ajudar com esse problema."
                ],
                "setContext":clearAll,
                "goToDialog":"ROOT"
            }
        ]
    }
];