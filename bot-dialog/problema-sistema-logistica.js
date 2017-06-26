const util = require('./util');
module.exports =[
    
    {
        "id": "probsist_logistica_problema_invalido",
        "priority":-2,
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"logistica_reversa",
                "problema_sistema":"*"
            }
        },
        "action": {
            "reply": [
                "Não consigo te ajudar com este problema neste sistema."
            ],
            "defineContext":util.clearContext
        }
    },

    {
        "id": "probsist_logistica_reset_senha",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"logistica_reversa",
                "problema_sistema":"reset_senha"
            }
        },
        "action": {
            "defineContext":{"entities":{"problema_sistema":"acesso"}},
            "evaluateNow":true
        },

    },

    {
        "id": "probsist_logistica_acesso",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"logistica_reversa",
                "problema_sistema":"acesso"
            },
            "probsist_logistica_acesso":null
        },
        "action": {
            "reply": [
                "Gostaria de solicitar um reset de senha para o logistica reversa?"
            ],
            "listenTo":["entities"],
            "defineContext":{"probsist_logistica_acesso":1,"entities":{"tipo_resposta":null}}
        }
    },
    {
        "id": "probsist_logistica_acesso_sim",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"logistica_reversa",
                "problema_sistema":"acesso",
                "tipo_resposta":"sim"
            },
            "probsist_logistica_acesso":1
        },
        "action": {
            "reply": [
                "{{reset_senha}}"
            ],
            "defineContext":util.clearContext
        }
    },

    {
        "id": "probsist_logistica_acesso_nao",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"logistica_reversa",
                "problema_sistema":"acesso",
                "tipo_resposta":"nao"
            },
            "probsist_logistica_acesso":1
        },
        "action": {
            "reply": [
                "Ok. Se precisa de mim para alguma outra coisa, estou aqui."
            ],
            "defineContext":util.clearContext
        }
    },

    {
        "id": "probsist_logistica_acesso_desconhecido",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"logistica_reversa",
                "problema_sistema":"acesso",
                "tipo_resposta":null
            },
            "probsist_logistica_acesso":1
        },
        "action": {
            "reply": [
                "Não entendi. Vou cancelar o procedimento, se precisar pode tentar novamente a qualquer momento."
            ],
            "defineContext":util.clearContext
        }
    }

];