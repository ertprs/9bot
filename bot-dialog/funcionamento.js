module.exports =[

    {
        "id": "funcionamento_geral",
        "scoreRule": {
            "intent": "funcionamento_lais",
        },
        "action": {
            "reply": [
                "Eu faço várias coisas pode me perguntar ssobre isso e aquilo."
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    }

];
