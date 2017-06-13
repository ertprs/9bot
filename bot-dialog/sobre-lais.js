module.exports =[
    {
        "id": "sobre_nome",
        "scoreRule": {
            "intent": "sobre_lais",
            "entities": {
                "info_lais": "nome"
            }
        },
        "action": {
            "reply": [
                "Meu nome é LAIS!!"
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    },
    {
        "id": "sobre_idade",
        "scoreRule": {
            "intent": "sobre_lais",
            "entities": {
                "info_lais": "idade"
            }
        },
        "action": {
            "reply": [
                "Tenho XPTO anos"
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    },

    {
        "id": "sobre_pais",
        "scoreRule": {
            "intent": "sobre_lais",
            "entities": {
                "info_lais": "pai"
            }
        },
        "action": {
            "reply": [
                "Meus pais são lalalla"
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    },

    {
        "id": "sobre_generico",
        "priority":-1,
        "scoreRule": {
            "intent": "sobre_lais"
        },
        "action": {
            "reply": [
                "Acho que não sei informar sobre isso. Me chamo Lais e faço coisas legais!"
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    }

];