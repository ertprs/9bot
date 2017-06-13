module.exports = {

    "saudacao": [
        "{{bomDiaNoiteTarde}}",
        "oi",
        "olá",
        "pois não",
        "olá. {{bomDiaNoiteTarde}}",
        "oi. {{bomDiaNoiteTarde}}"
    ],
    "deNada":[
        "de nada",
        "obrigado eu",
        "não há de que",
        "não tem de quê",
        "por nada",
        "disponha",
        "imagina",
        "às ordens"
    ],
    "bomDiaNoiteTarde": function () {
        var today = new Date()
        var curHr = today.getHours()
        var ret = "";
        if (curHr < 12) {
            ret = "bom dia";
        } else if (curHr < 18) {
            ret = "boa tarde";
        } else {
            ret = "boa noite";
        }
        return ret;
    },
    "possoAjudar_EOL":[
        "em que posso ajudar ?",
        "como posso ser útil ?",
        'precisa de ajuda ?',
        "o que está precisando ?",
        "como posso lhe ajudar hoje ?"
    ],
    "mensagemSaudacao": "{{saudacao}},{{possoAjudar}}?",
    "Acom":"{{saudacao}}, vejo que você quer saber informações sobre compras na Americanas.com",
    "Agradecimento":"{{deNada}}",
    "Cartao": "hum... acho que você está querendo saber mais sobre o cartão.",
    "Funcionamento_de_Loja": "ah sim... Sei tudo sobre funcionamento de loja.... ééééé... esqueci (hestonfacepalm) ",
    "none":"(whatsgoingon) Opss... não sei o que dizer",
    "Ola":"{{saudacao}}, {{possoAjudar_EOL}}"
};


