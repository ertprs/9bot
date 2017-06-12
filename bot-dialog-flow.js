module.exports = [
    {
        "id": "sobre_lais",
        "priority": -100,
        "scoreRule": {
            "intent": "sobre_lais",
            "entities": {
                "info_lais": "pai"
            }
        },
        "action": {
            "reply": [
                "Por incrível que pareça tenho alguns pais..."
            ]
        }
    },
    {
        "id": "sobre_lais2",
        "fromNode": "*",
        "priority": -100,
        "scoreRule": {
            "intent": "sobre_lais",
            "entities": {
                "info_lais": "nome"
            }
        },
        "action": {
            "reply": [
                "Meu nome é LASA Artificial Intelligence System ou Lais para os mais íntimos."
            ]
        }
    },
    {
        "id": "sobre_lais3",
        "fromNode": null,
        "priority": -100,
        "scoreRule": {
            "intent": "sobre_lais",
            "entities": {
                "info_lais": "idade"
            }
        },
        "action": {
            "reply": [
                "Atualmente meu uptime é de menos de 24hs."
            ]
        }
    },
    {
        "id": "nao_entendeu",
        "fromNode": null,
        "priority": -1000,
        "scoreRule": {
        },
        "action": {
            "reply": [
                "Fiquei com dúvida e não consegui entender. Poderia ser um pouco mais específico??"
            ]
        }
    },
    {
        "id": "nao_entendeu2",
        "fromNode": null,
        "priority": -999,
        "scoreRule": {
            "intent": null,
            "saudacaoFeita": null
        },
        "action": {
            "reply": [
                "Fiquei com dúvida e não consegui entender. Poderia ser um pouco mais específico?"
            ]
        }
    },
    {
        "scoreRule": {
            "intent": "saudacao",
            "saudacaoFeita": null
        },
        "action": {
            "reply": [
                "Olá, me chamo Lais.",
                "Em que posso ajudar?"
            ],
            "defineContext": {
                "saudacaoFeita": true
            }
        }
    },
    {
        "scoreRule": {
            "intent": "saudacao",
            "saudacaoFeita": true
        },
        "action": {
            "reply": [
                "Pois não"
            ]
        }
    },
    {
        "id": "problema_sist_qual_sistema",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": null
            }
        },
        "action": {
            "reply": [
                "Preciso saber de qual sistema você está falando. Em qual sistema você está com problema?"
            ],
            "defineContext": {
                "descobrindoSistema": true
            },
            "listenTo": [
                "entities"
            ]
        }
    },
    {
        "id": "problema_sist_qual_sistema_2",
        "fromNode": "problema_sist_qual_sistema",
        "priority": 1,
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": null
            },
            "descobrindoSistema": true
        },
        "action": {
            "reply": [
                "Não reconheço esse sistema. Posso te ajudar apenas com o perecíveis ou chamado. Com qual destes sistema posso te ajudar ?"
            ],
            "defineContext": {
                "descobrindoSistema": true
            }
        }
    },
    {
        "id": "problema_sist_qual_sistema_3",
        "fromNode": "problema_sist_qual_sistema_2",
        "priority": 2,
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": null
            },
            "descobrindoSistema": true
        },
        "action": {
            "reply": [
                "Infelizmente, não estou conseguindo entender sobre o que estava falando. Posso tentar te ajudar comalguma outra coisa?"
            ],
            "defineContext": {
                "descobrindoSistema": null,
                "intent": null,
                "entities": null
            },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    },
    {
        "id": "abrir_chamado",
        "fromNode": "problema_sist_qual_topico_3",
        "priority": 1,
        "scoreRule": {
            "intent": "decisao_resposta",
            "entities": {
                "tipo_resposta": "sim"
            }
        },
        "action": {
            "reply": [
                "O chamado #0000000001 para o sistema Perecíveis foi aberto com sucesso, com o conteúdo dessa conversa. Algo mais?"
            ],
            "defineContext": {
                "descobrindotopico": null,
                "intent": null,
                "entities": null
            }
        }
    },

    {
        "id": "abrir_chamado2",
        "fromNode": "problema_sist_qual_topico_3",
        "priority": 1,
        "scoreRule": {
            "intent": "decisao_resposta",
            "entities": {
                "tipo_resposta": "nao"
            }
        },
        "action": {
            "reply": [
                "Certo, vou deixar essa com você por enquanto. Algo mais?"
            ],
            "defineContext": {
                "descobrindotopico": null,
                "intent": null,
                "entities": null
            }
        }
    },

    {
        "id": "problema_sist_qual_topico",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "topico_pereciveis": null
            }
        },
        "action": {
            "reply": [
                "Qual dificuldade você está encontrando no pereciveis?"
            ],
            "defineContext": {
                "descobrindotopico": true,
                "descobrindoSistema": null
            }
        }
    },
    {
        "id": "problema_sist_qual_topico_2",
        "fromNode": "problema_sist_qual_topico",
        "priority": 1,
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "topico_pereciveis": null
            }
        },
        "action": {
            "reply": [
                "Não sei se posso te ajudar com isso. Posso te ajudar com: login, baixa de item ou camera. "
            ]
        }
    },
    {
        "id": "problema_sist_qual_topico_3",
        "fromNode": "problema_sist_qual_topico_2",
        "priority": 2,
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "topico_pereciveis": null
            }
        },
        "action": {
            "reply": [
                "Infelizmente, não estou conseguindo entender sobre o que estava falando. Posso tentar te ajudar com alguma outra coisa?"
            ],
            "defineContext": {
                "descobrindotopico": null,
                "intent": null,
                "entities": null
            },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    },
    {
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "topico_pereciveis": "camera"
            }
        },
        "action": {
            "reply": [
                "Para permitir a utilização da câmera, siga os seguintes passos:" +
                "a) Puxar a parte superior da tela para baixo;" +
                "b) Selecionar a opção “configurações”, representada pelo símbolo de uma engrenagem;" +
                "c) Selecionar a aba “geral”;" +
                "d) Selecionar a opção “Aplicativos”;" +
                "e) Selecione o aplicativo “Perecíveis”;" +
                "f) Selecione a opção “Permissões”;" +
                "g) Na opção câmera arraste o botão localizado do lado direito para a direita, habilitando a opção de utilização da câmera." +
                "h) Entre novamente no aplicativo e confira se a câmera funcionou.",
                "Posso te ajudar com mais alguma coisa?"
            ],
            "defineContext": {
                "solucaoProposta": true,
                "intent": null,
                "entities": null
            },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    },
    {
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "topico_pereciveis": "baixa_item"
            }
        },
        "action": {
            "reply": [
                "Tente fazer isso para resolver seu problema com a baixa de item"
            ]
        }
    },
    {
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "topico_pereciveis": "loja_associada"
            }
        },
        "action": {
            "reply": [
                "Tente fazer isso para resolver seu problema com a loja não associada"
            ]
        }
    },
    {
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "topico_pereciveis": "sincronizacao"
            }
        },
        "action": {
            "reply": [
                "Tente fazer isso para resolver seu problema cdm a sincronizacao"
            ]
        }
    }
];