module.exports =[
    {
        "id": "info_loja_venda",
        "scoreRule": {
            "intent": "informacao_loja",
            "entities": {
                "info_loja": "venda",
                "sys-number": "*"
            }            
        },
        "action": {
            "reply": [
                "A venda para a loja é de R$35.000" 
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    },
    {
        "id": "info_loja_venda_minha_loja",
        "scoreRule": {
            "intent": "informacao_loja",
            "entities": {
                "info_loja": "venda"
            }            
        },
        "action": {
            "reply": [
                "Olá GGL Saulo, a venda da sua loja (L022) até o momento é de R$ 45.00" 
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    },

    {
        "id": "info_loja_venda",
        "scoreRule": {
            "intent": "informacao_loja",
            "entities": {
                "info_loja": "previsao",
                "sys-number": "*"
            }            
        },
        "action": {
            "reply": [
                "A previsão para a loja é de R$ 95.000" 
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    },
    {
        "id": "info_loja_venda",
        "scoreRule": {
            "intent": "informacao_loja",
            "entities": {
                "info_loja": "atingimento",
                "sys-number": "*"
            }            
        },
        "action": {
            "reply": [
                "O atingimento para a loja é de 87%" 
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    }        
];