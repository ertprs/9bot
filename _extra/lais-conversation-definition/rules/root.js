const {get,add} = require('./util');

module.exports = [
    {
        "id":"ROOT_reset_senha",
        "dialog":"ROOT",
        "match":(c)=>{
            return get("intents.0",c)==="reset_senha"
        },
        "actions":[
            {
                "evaluateNext":true,
                "goToDialog":"reset_senha"
            }
        ]
    },
    {
        "id": "ROOT_problema_sistema",
        "dialog": "ROOT",
        "match": (c) => {
            return get("intents.0", c) === "problema_sistema"
        },
        "actions": [
            {
                "evaluateNext": true,
                "goToDialog": "problema_sistema"
            }
        ]
    },
    {
        "id":"ROOT_saudacao",
        "dialog":"ROOT",
        "match":(c)=>{
            return get("intents.0", c) === "saudacao"
        },
        "actions":[
            {
                "replies":[
                    "Olá."
                ]
            }
        ]
    },
    {
        "id":"ROOT_fallback",
        "dialog":"ROOT",
        "priority":-9999,
        "match":()=>true,
        "actions":[
            {
                "replies":[
                    "Não entendi o que você disse."
                ]
            }
        ]
    }
];
