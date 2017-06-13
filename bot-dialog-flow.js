module.exports = [
    //DESPEDIDA
    {
        "id": "despedida",
        "priority": 0,
        "scoreRule": {
            "intent": "despedida"
        },
        "action": {
            "reply": [
                "Até a próxima!"
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    },
    //FIM DESPEDIDA
    //AGRADECIMENTO
    {
        "id": "agradecimento",
        "priority": 0,
        "scoreRule": {
            "intent": "agradecimento"
        },
        "action": {
            "reply": [
                "Disponha sempre! (like)"
            ],
            "defineContext": { "intent": null, "entities": null },
            "listenTo": [
                "entities",
                "intent"
            ]
        }
    },
    //FIM AGRADECIMENTO

    // ABERTURA DE CHAMADO
    {
        "id": "abrir_chamado_reset_senha",
        "priority": 0,
        "scoreRule": {
            "intent": "abrir_chamado_reset_senha",
            "entities": {
                "sistema": "logistica reversa",
                "tipo_chamado": "reset senha"
            }
        },
        "action": {
            "reply": [
                "Confirma abrir um chamado para o sistema Logística Reversa para resetar sua senha?"
            ]
        }
    },
    {
        "id": "confirmar_abrir_chamado",
        "fromNode": "abrir_chamado_reset_senha",
        "priority": 0,
        "scoreRule": {
            "intent": "decisao_resposta",
            "entities": {
                "sistema": "logistica reversa",
                "tipo_chamado": "reset senha",
                "tipo_resposta": "sim"
            }
        },
        "action": {
            "reply": [
                "Sua sena foi resetada. A nova senha é #lasa2017" + "\n\n" +
                "por favor anote em um lugar seguro."
            ],
            "defineContext": { "intent": null, "entities": null }
        }
    },
    {
        "id": "confirmar_abrir_chamado",
        "fromNode": "abrir_chamado_reset_senha",
        "priority": 0,
        "scoreRule": {
            "intent": "decisao_resposta",
            "entities": {
                "sistema": "logistica reversa",
                "tipo_chamado": "reset senha",
                "tipo_resposta": "nao"
            }
        },
        "action": {
            "reply": [
                "Ok, chamado cancelado."
            ],
            "defineContext": { "intent": null, "entities": null }
        }
    },
    {
        "id": "abrir_chamado_reset_senha2",
        "priority": 0,
        "scoreRule": {
            "intent": "abrir_chamado_reset_senha",
            "entities": {
                "sistema": null,
                "tipo_chamado": "reset senha"
            }
        },
        "action": {
            "reply": [
                "Para qual sistema gostaria de resetar a senha?"
            ],
            "listenTo": [
                "entities"
            ]
        }
    },
    {
        "id": "abrir_chamado_reset_senha3",
        "fromNode": "abrir_chamado_reset_senha2",
        "priority": 0,
        "scoreRule": {
            "intent": "abrir_chamado_reset_senha",
            "entities": {
                "sistema": "logistica reversa",
                "tipo_chamado": "reset senha"
            }
        },
        "action": {
            "reply": [
                "Confirma abrir um chamado para o sistema Logística Reversa para resetar sua senha?"
            ],
            "defineContext": { "intent": null, "entities": null},
            "listenTo": [
                "intent", "entities"
            ]
        }
    },
    {
        "id": "confirmar_abrir_chamado3",
        "fromNode": "abrir_chamado_reset_senha3",
        "priority": 0,
        "scoreRule": {
            "intent": "decisao_resposta",
            "entities": {
                "tipo_resposta": "sim"
            }
        },
        "action": {
            "reply": [
                "Sua sehna foi resetada. A nova senha é #lasa2017" + "\n\n" +
                "por favor anote em um lugar seguro."
            ],
            "listenTo": [
                "entities", "intent"
            ],
            "defineContext": { "intent": null, "entities": null }
        }
    },
    {
        "id": "confirmar_abrir_chamado4",
        "fromNode": "abrir_chamado_reset_senha3",
        "priority": 0,
        "scoreRule": {
            "intent": "decisao_resposta",
            "entities": {
                "tipo_resposta": "nao"
            }
        },
        "action": {
            "reply": [
                "Ok, chamado cancelado."
            ],
            "listenTo": [
                "entities", "intent"
            ],
            "defineContext": { "intent": null, "entities": null }
        }
    },

    {
        "id": "abrir_chamado",
        "priority": 0,
        "scoreRule": {
            "intent": "abrir_chamado",
            "entities": {
                "sistema": null,
                "tipo_chamado": null
            }
        },
        "action": {
            "reply": [
                "Por enquanto só é possível abrir um chamado de reset de senha para o Logística Reversa."
            ]
        }
    },

    {
        "id": "abrir_chamado_logistica_qual_tipo",
        "priority": 0,
        "scoreRule": {
            "intent": "abrir_chamado",
            "entities": {
                "sistema": "logistica reversa",
                "tipo_chamado": null
            }
        },
        "action": {
            "reply": [
                "Posso abrir um chamado do logísitca reversa para você. Qual tipo devo usar?"
            ]
        }
    },

    {
        "id": "abrir_chamado_sistema_nao_suportado",
        "priority": -10,
        "scoreRule": {
            "intent": "abrir_chamado",
            "entities": {
                "sistema": "*"
            }
        },
        "action": {
            "reply": [
                "Infelizmente só consigo abrir chamados para o logística reversa por enquanto.\n\n"
                +"Estou constantemente aprendendo. Em breve, tenho certeza que poderei ajudá-lo."
            ]
        }
    },

    {
        "id": "abrir_chamado_logistica_reset",
        "priority": 0,
        "scoreRule": {
            "intent": "abrir_chamado",
            "entities": {
                "sistema": "logistica reversa",
                "tipo_chamado": "reset senha"
            }
        },
        "action": {
            "evaluateNow":true,
            "defineContext":{
                "intent": "abrir_chamado_reset_senha"
            }
        }
    },


    {
        "id": "ajuda_tipo_chamado",
        "priority": 0,
        "scoreRule": {
            "intent": "ajuda_tipo_chamado"
        },
        "action": {
            "reply": [
                "Os tipos de chamados são:" + "\n\n" +
                "- Reset de Senha (Logística Reversa apenas)" + "\n\n" +
                "- Problema com o PDV"
            ]
        }
    },

    // FIM CHAMADO

    // FUNCIONAMENTO LAIS
    {
        "id": "funcionamento_lais",
        "priority": -100,
        "scoreRule": {
            "intent": "funcionamento_lais"
        },
        "action": {
            "reply": [
                "Ainda sou jovem, consigo apenas ajudar com o perecíveis ou abrir alguns chamados específicos."
            ],
            "defineContext": { "intent": null, "entities": null }
        }
    },
    // FIM FUNCIONAMENTO LAIS
    //SOBRE LAIS
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
            ],
            "defineContext": { "entities": null }
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
                "Meu nome é LASA Artificial Intelligence System ou Lais para os mais íntimos.",
                "Em que posso te ajudar?"
            ],
            "defineContext": { "entities": null }
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
            ],
            "defineContext": { "entities": null }
        }
    },

    //FIM SOBRE
    // GERAL
    {
        "id": "nao_entendeu",
        "fromNode": null,
        "priority": -1000,
        "scoreRule": {
        },
        "action": {
            "reply": [
                "Ainda estou aprendendo e no momento ajudo com dúvidas no sistema perecíveis ou " +
                "chamados para reset de senhas.",
                "Então, posso ajudar em algo?"
            ],
            "defineContext": { "intent": null, "entities": null }
        }
    },
    //FIM GERAL
    {
        "id": "saudacao",
        "scoreRule": {
            "intent": "saudacao",
            "saudacaoFeita": null
        },
        "action": {
            "reply": [
                "Olá, em que posso ajudar?"
            ],
            "defineContext": {
                "saudacaoFeita": true
            }
        }
    },
    {
        "id": "saudacao2",
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
        "id": "resposta_problema",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "topico_pereciveis": "camera"
            }
        },
        "action": {
            "reply": [
                "Para permitir a utilização da câmera, siga os seguintes passos:" + "\n\n" +
                "a) Puxar a parte superior da tela para baixo;" + "\n\n" +
                "b) Selecionar a opção “configurações”, representada pelo símbolo de uma engrenagem;" + "\n\n" +
                "c) Selecionar a aba “geral”;" + "\n\n" +
                "d) Selecionar a opção “Aplicativos”;" + "\n\n" +
                "e) Selecione o aplicativo “Perecíveis”;" + "\n\n" +
                "f) Selecione a opção “Permissões”;" + "\n\n" +
                "g) Na opção câmera arraste o botão localizado do lado direito para a direita, habilitando a opção de utilização da câmera." + "\n\n" +
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
        "id": "resposta_problema",
        "fromNode": "*",
        "priority": -1001,
        "scoreRule": {
            "intent": "decisao_resposta",
            "entities": {
                "tipo_resposta": "nao"
            }
        },
        "action": {
            "reply": [
                "Certo, se precisar estou aqui."
            ],
            "defineContext": {
                "descobrindotopico": null,
                "intent": null,
                "entities": null
            }
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