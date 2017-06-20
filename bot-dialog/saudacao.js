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
                " {{saudacao_inicial}}",
                {
                    "type":"choice",
                    "content":[
                        "Opt1","Opt2","Opt3"
                    ]
                },
                {
                    "type":"choice",
                    "meta":{"title":"Qual opção você quer escolher?","subtitle":"Escolha com sabedoria","text":"sua escolha é muito importante!"},
                    "content":[
                        "Opt1",{"text":"Opt2","value":"Escolhida a opção 2"},"Opt3"
                    ]
                }
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
