const util = require('./util');
module.exports =[

    {
        "id": "probsist_generico",
        "priority":-10,
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":null,
                "problema_sistema":null,
            },
            "probsist_generico":null
        },
        "action": {
            "reply": [
                "Por favor me informe o sistema e o problema que você está tendo."
            ],
            "listenTo": [
                "entities"
            ],
            "defineContext":{"probsist_generico":1}
        }
    },

    {
        "id": "probsist_generico_2",
        "priority":-10,
        "scoreRule": {
            "intent": "problema_sistema",
            "sistema":null,
            "problema_sistema":null,
            "probsist_generico":1
        },
        "action": {
            "reply": [
                "Não entendi tente novamente descrevendo o seu problema da melhor maineira possível."
            ],
            "defineContext":util.clearContext
        }
    },

    {
        "id": "probsist_qual_sistema",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":null,
                "problema_sistema":"*"
            },
            "probsist_qual_sistema":null
        },
        "action": {
            "reply": [
                "Tudo bem. Preciso saber de qual sistema você está falando."
            ],
            "listenTo": [
                "entities"
            ],
            "defineContext":{"probsist_qual_sistema":1}
        }
    },

    {
        "id": "probsist_qual_sistema_2",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":null,
                "problema_sistema":"*"
            },
            "probsist_qual_sistema":1
        },
        "action": {
            "reply": [
                "Não entendi tente novamente descrevendo o seu problema da melhor maineira possível."
            ],
            "defineContext":util.clearContext
        }
    },

    {
        "id": "probsist_qual_problema",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"*",
                "problema_sistema":null
            },
            "probsist_qual_problema":null
        },
        "action": {
            "reply": [
                "Tudo bem. Descreva qual problema você está tendo."
            ],
            "listenTo": [
                "entities"
            ],
            "defineContext":{"probsist_qual_problema":1}
        }
    },

    {
        "id": "probsist_qual_problema_2",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"*",
                "problema_sistema":null
            },
            "probsist_qual_problema":1
        },
        "action": {
            "reply": [
                "Não entendi. Tente novamente descrever o seu problema da melhor maineira possível."
            ],
            "defineContext":util.clearContext
        }
    }

];