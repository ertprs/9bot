const util = require('./util');
module.exports = [

    {
        "id": "geral_nao_entendi",
        "priority":-9999,
        "scoreRule": {
        },
        "action": {
            "reply": [
                "Não entendi o que você quis dizer. Tente reformular sua frase por favor."
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    },
    {
        "id": "geral_saudacao",
        "scoreRule": {
            "intent":"saudacao"
        },
        "action": {
            "reply": [
                "{{saudacao}}"
            ],
            "defineContext": util.clearContext,
        }
    },
    {
        "id": "geral_agradecimento",
        "scoreRule": {
            "intent":"agradecimento"
        },
        "action": {
            "reply": [
                "Disponha. Estou aqui para o que precisar"
            ],
            "defineContext": util.clearContext
        }
    }
];
