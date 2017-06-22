const util = require('./util');
module.exports = [
    {
        "id": "problema_pdv",
        "scoreRule": {
            "intent": "problema_pdv",
            "entities": {
                "problema_loja": "pdv"
            }
        },
        "action": {
            "reply": [
                "Antes de abrirmos um chamado, siga os procedimentos abaixo:",
                "1-Verifique se o cabo está devidamente conectado",
                util.replyStaticMedia("pdv1.png"),
                "2-Verifique se os componentes estão encaixados",
                util.replyStaticMedia("pdv2.jpg"),
                "3-Verifique se o cabo de força está conectado",
                util.replyStaticMedia("pdv3.jpg")

            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    }
];
