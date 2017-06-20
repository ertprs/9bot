module.exports =[

    {
        "id": "funcionamento_geral",
        "priority": -900,
        "scoreRule": {
            "intent": "funcionamento_lais",
        },
        "action": {
            "reply": [
                "{{ajuda_geral}}",
                "Em breve muito mais! ;)"
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    }
];
