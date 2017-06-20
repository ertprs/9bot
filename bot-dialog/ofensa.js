module.exports = [
    {
        "id": "ofensa",
        "priority":0,
        "scoreRule": {
            "intent": "ofensa"
        },
        "action": {
            "reply": [
                "{{palavrao}}"
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    }
]