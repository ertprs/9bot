const {get,add, clearAll} = require('./util');

module.exports = [
    {
        "id":"PLOGL_confirma",
        "dialog":"prob_sist_logistica_login",
        "match":(c)=>{
            return get("entities.tipo_resposta.0",c)==='sim'
        },
        "actions":[
            {
                "setContext":(c)=>{c=clearAll(c);c.entities.sistema[0]="logistica_reversa";return c},
                "goToDialog":"reset_senha"
            }
        ]
    },
    {
        "id": "PLOGL_cancela",
        "dialog": "prob_sist_sap_login",
        "match": (c) => {
            return get("entities.tipo_resposta.0", c) === 'nao'
        },
        "actions": [
            {
                "replies": ["Procedimento cancelado."],
                "setContext": clearAll,
                "goToDialog": "ROOT"
            }
        ]
    },
    {
        "id":"PLOGL_opt_invalida",
        "dialog":"prob_sist_sap_login",
        "match":(c)=>{
            return get("entities.tipo_resposta.0",c)===null
        },
        "actions":[
            {
                "match":(c)=>get("count_PLOGL_opt_invalida",c)<=1,
                "replies":["Desculpe não entendi. Gostaria de realizar o reset? (Responda com \"sim\" ou \"não\")"],
            },
            {
                "setContext":(c)=>add("count_PLOGL_opt_invalida",c)
            },
            {
                "match":(c)=>get("count_PLOGL_opt_invalida",c)>1,
                "replies":["Desculpe não entendi. Vou cancelar o procedimento agora. Se você desejar, poderá solicitar novamente."],
                "setContext":clearAll,
                "goToDialog":"ROOT"
            }
        ]
    }
];