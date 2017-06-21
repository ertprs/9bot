const util = require('./util');
module.exports = [
    {
        "id": "probsist_generico",
        "priority": -10,
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": null,
                "problema_sistema": null,
            },
            "probsist_generico": null
        },
        "action": {
            "reply": [
                "Por favor me informe o sistema e o problema que você está tendo."
            ],
            "listenTo": [
                "entities"
            ],
            "defineContext": { "probsist_generico": 1 }
        }
    },
    {
        "id": "probsist_qual_sistema",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": null,
                "problema_sistema": "*"
            },
            "probsist_qual_sistema": null
        },
        "action": {
            "reply": [
                "Preciso saber de qual sistema você tem esse problema."
            ],
            "listenTo": [
                "entities"
            ],
            "defineContext": { "probsist_qual_sistema": 1 }
        }
    },

    {
        "id": "probsist_qual_sistema_2",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": null,
                "problema_sistema": "*"
            },
            "probsist_qual_sistema": 1
        },
        "action": {
            "reply": [
                "Não consegui entender o problema. Tente informar seu problema detalhadamente ou " +
                "pergunte-me em que posso te ajudar para maiores detalhes."
            ],
            "defineContext": util.clearContext
        }
    },

    {
        "id": "probsist_qual_problema",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "*",
                "problema_sistema": null
            },
            "probsist_qual_problema": null
        },
        "action": {
            "reply": [
                "Tudo bem identifiquei o sistema. Descreva qual dúvida ou problema que você tem."
            ],
            "listenTo": [
                "entities"
            ],
            "defineContext": { "probsist_qual_problema": 1 }
        }
    },

    {
        "id": "probsist_qual_problema_2",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "*",
                "problema_sistema": null
            },
            "probsist_qual_problema": 1
        },
        "action": {
            "reply": [
                "Desculpe, não consegui entender sua necessidade.\n\n" +
                "Tente descrever da melhor maneira possível ex.:" +
                "Gostaria de resetar minha senha do logística reversa ou " +
                "Não consigo acessar a câmera do aplicativo perecíveis."
            ],
            "defineContext": util.clearContext
        }
    }, 
    {
        "id": "problema_sistema_reset_senha",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": null, 
                "problema_sistema": "reset_senha"
            }
        },
        "action": {
            "reply": [
                "Atualmente você pedir um reset de senha para os sistemas:\n\n"+
                "- Logística Reversa\n\n"+
                "- Perecíveis\n\n"+
                "- WebLoja\n\n"+
                "- Oper\n\n",
                "Qual sistema gostaria de redefinir sua senha?"
            ],
            "listenTo": ["entities"]
        }
    },
    {
        "id": "sistema_identificado_nao_tratado",
        "priority": -900,
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "*",
            },
        },
        "action": {
            "reply": [
                "{{ajuda_geral}}",
                ";)"
            ],
            "defineContext": util.clearContext
        }
    }
];