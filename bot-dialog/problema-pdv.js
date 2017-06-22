const util = require('./util');
module.exports = [
    {
        "id": "problema_pdv",
        "priority":-9999,
        "scoreRule": {
        },
        "action": {
            "reply": [
                "Não entendi o que você quis dizer, tente reformular sua frase por favor.\n\n"+
                "Em caso de dúvidas do que pode fazer, é só pedir por ajuda."
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    }
];
