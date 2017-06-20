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
        "id": "probsist_generico_2",
        "priority": -10,
        "scoreRule": {
            "intent": "problema_sistema",
            "sistema": null,
            "problema_sistema": null,
            "probsist_generico": 1
        },
        "action": {
            "reply": [
                "{{ajuda_geral}}"
            ],
            "defineContext": util.clearContext
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
                "Tudo bem. Preciso saber de qual sistema você está falando."
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
                "Não consegui entender corretamente. Tente informar seu problema detalhadamente ou " +
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
                "Tudo bem. Descreva qual dúvida ou problema você está tendo."
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
                "Tente descrever da melhor maneira possível ou " +
                "pergunte-me em que posso te ajudar para maiores detalhes."
            ],
            "defineContext": { "probsist_qual_problema": 2 }
        }
    },
    {
        "id": "probsist_qual_problema_3",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "*",
                "problema_sistema": null
            },
            "probsist_qual_problema": 2
        },
        "action": {
            "reply": [
                "{{contexto_nao_entendido_ajuda_externa}}"
            ],
            "defineContext": { "abrir_chamado_geral": 1 },
            "listenTo": [
                "entities"
            ]
        }
    },
    {
        "id": "abrir_chamado_geral_sim",
        "scoreRule": {
            "intent": "*",
            "entities": {
                "tipo_resposta": "sim"
            },
            "abrir_chamado_geral": 1
        },
        "action": {
            "reply": [
                "O chamado de número #000002 foi aberto.\n\n" +
                "Se precisar de mais alguma ajuda é só pedir. ;)"
            ],
            "defineContext": util.clearContext
        }
    },
    {
        "id": "abrir_chamado_geral_nao",
        "scoreRule": {
            "intent": "*",
            "entities": {
                "tipo_resposta": "nao"
            },
            "abrir_chamado_geral": 1
        },
        "action": {
            "reply": [
                "Certo. Se desejar mais alguma coisa, pergunte-me como posso ajudar."
            ],
            "defineContext": util.clearContext
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