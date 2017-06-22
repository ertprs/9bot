const util = require('./util');
module.exports = [
    {
        "id": "saudacao_inicial",
        "scoreRule": {
            "intent": "saudacao",
            "saudacao_inicial_feita": null,
        },
        "action": {
            "reply": [                          
                " {{saudacao_inicial}}"
            ],
            "defineContext": { "saudacao_inicial_feita": 1 }
        }
    },
    {
        "id": "saudacao_geral",
        "scoreRule": {
            "intent": "saudacao",
            "saudacao_inicial_feita": 1
        },        
        "action": {
            "reply": [
                "{{saudacao_geral}}"
            ]
        }
    },
   {
        "id": "saudacao_por_nome",
        "scoreRule": {
            "intent": "saudacao",
            "entities": {
                "info_lais":"nome"
            }
        },        
        "action": {
            "reply": [
                "{{saudacao_geral}}"
            ]
        }
    },    
    {
        "id": "geral_agradecimento",
        "scoreRule": {
            "intent": "agradecimento"
        },
        "action": {
            "reply": [
                "{{agradecimento}}"
            ],
            "defineContext": util.clearContext
        }
    }
];
