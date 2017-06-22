const util = require('./util');
//http://perecivel.lasa.com.br/perecivel-manual/
module.exports = [
    {
        "id": "probsist_pereciveis_problema_invalido",
        "priority": -2,
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "problema_sistema": "*"
            }
        },
        "action": {
            "reply": [
                "Infelizmente ainda não posso ajudar com esse problema do Perecíveis.\n\n"+
                "Mas você pode consultar o hotsite do perecíveis buscando mais informações:",
                "http://perecivel.lasa.com.br/perecivel-manual/"
            ],
            "defineContext": util.clearContext
        }
    },

    {
        "id": "probsist_pereciveis_acesso",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "problema_sistema": "acesso"
            }
        },
        "action": {
            "reply": [
                "{{acesso_senha}}"
            ],
            "defineContext": util.clearContext
        }
    },

    {
        "id": "probsist_pereciveis_loja_nao_associada",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "problema_sistema": "loja_nao_associada"
            }
        },
        "action": {
            "reply": [
                "Nesse caso, você deve solicitar a equipe do WebLoja que associe uma loja ao seu usuário."
            ],
            "defineContext": util.clearContext
        }
    },

    {
        "id": "probsist_pereciveis_sincronizacao",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "problema_sistema": "sincronizacao"
            }
        },
        "action": {
            "reply": [
                "Tente seguir este procedimento para resolver seu problema:\n\n"
                + "- Efetuar a desconexão e reconexão do aplicativo.\n\n"
                + "- Favor entrar em: configuração - aplicativos - perecíveis - armazenamento - apagar dados.\n\n"
                + "- Desconecte da aplicação, selecionando o botão no canto superior direito, ao lado das palavras LOJA MOBILE, e depois entrar com o seu usuário e senha novamente.\n\n",
                util.replyStaticMedia("pereciveis_problema_deslogar.png")
            ],
            "defineContext": util.clearContext
        }
    },

    {
        "id": "probsist_pereciveis_camera",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "problema_sistema": "camera"
            }
        },
        "action": {
            "reply": [
                "Tente seguir este procedimento para resolver seu problema:\n\n"
                + "Para permitir a utilização da câmera, siga os seguintes passos:\n\n"
                + "a)Puxar a parte superior da tela para baixo;\n\n"
                + "b)Selecionar a opção “configurações”, representada pelo símbolo de uma engrenagem;\n\n"
                + "c)Selecionar a aba “geral”;\n\n"
                + "d)Selecionar a opção “Aplicativos”;\n\n"
                + "e)Selecione o aplicativo “Perecíveis”;\n\n"
                + "f)Selecione a opção “Permissões”;\n\n"
                + "g)Na opção câmera arraste o botão localizado do lado direito para a direita, habilitando a opção de utilização da câmera.\n\n"
                + "h)Entre novamente no aplicativo",
                util.replyStaticMedia("pereciveis_problema_camera.png")
            ],
            "defineContext": util.clearContext
        }
    },
    {
        "id": "probsist_pereciveis_baixa_item",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "problema_sistema": "baixa_item"
            }
        },
        "action": {
            "reply": [
                "Tente seguir este procedimento para resolver seu problema de Baixa de Item:\n\n" +
                "- Na lista de itens, você precisa expandir os lotes e selecionar aquele desejado.\n\n"+
                "- Em seguida, aperte o ícone '+'.\n\n" +
                "- Selecione 'Solicitar baixa', em seguida, confira os dados e confirme a solicitação."
            ],
            "defineContext": util.clearContext
        }
    },

    {
        "id": "probsist_pereciveis_erro_inesperado",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis",
                "problema_sistema": "erro_inesperado"
            },
            "probsist_pereciveis_erro_inesperado_chamado": null
        },
        "action": {
            "reply": [
                "Em caso de 'Erro Inesperado' ou não funcionamento, a recomendação é entrar em contato com a equipe de suporte " +
                "e descrever seu problema detalhadamente.\n\n" +
                "Gostaria que eu abrisse um chamado para você?"
            ],
            "listenTo": ["entities"],
            "defineContext": { "probsist_pereciveis_erro_inesperado_chamado": 1, "entities": { "tipo_resposta": null } }
        }
    },
    {
        "id": "probsist_pereciveis_erro_inesperado_chamado_sim",
        "fromNode": "probsist_pereciveis_erro_inesperado",
        "scoreRule": {
            "entities": {
                "sistema": "pereciveis",
                "problema_sistema": "erro_inesperado",
                "tipo_resposta": "sim"
            },
            "probsist_pereciveis_erro_inesperado_chamado": 1
        },
        "action": {
            "reply": [
                "Seu chamado de número #0000000001 foi aberto com sucesso contendo o conteúdo dessa conversa."
            ],
            "defineContext": util.clearContext
        }
    },
    {
        "id": "probsist_pereciveis_erro_inesperado_chamado_nao",
        "fromNode": "probsist_pereciveis_erro_inesperado",
        "scoreRule": {
            "entities": {
                "sistema": "pereciveis",
                "problema_sistema": "erro_inesperado",
                "tipo_resposta": "nao"
            },
            "probsist_pereciveis_erro_inesperado_chamado": 1
        },
        "action": {
            "reply": [
                "Ok, se precisar de mais algo, é só falar."
            ],
            "defineContext": util.clearContext
        }
    },
    {
        "id": "cadastro_item_pereciveis",
        "scoreRule": {
            "entities": {
                "sistema": "pereciveis",
                "problema_sistema": "cadastro_item_pereciveis"
            }
        },
        "action": {
            "reply": [
                "Antes de iniciarmos um cadastro, você precisa entrar na aplicação com os seus dados.\n\n" +
                "Após a confirmação, siga as instruções abaixo para realizar um cadastro:\n\n" +
                "- Selecione ' + ' e em seguida escaneie o código de barras ou digite o EAN do produto.\n\n" +
                "- Após a adição do código, insira o lote, data de vencimento e uantidade.\n\n" +
                "- Em seguida, aperte o 'check'.\n\n"+
                "Você sempre poderá obter mais ajuda em:",
                "http://perecivel.lasa.com.br/perecivel-manual/"
            ],
            "defineContext": util.clearContext
        }
    },
    {
        "id": "probsist_pereciveis_reset",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities": {
                "sistema": "pereciveis", 
                "problema_sistema": "reset_senha"
            }
        },
        "action": {
            "reply": [
                "Confirma o reset da sua senha?"
            ],
            "listenTo": ["entities"],
            "defineContext": { "probsist_pereciveis_reset": 1, "entities": { "tipo_resposta": null } }
        }
    },
    {
        "id": "probsist_pereciveis_reset_sim",
        "scoreRule": {
            "entities": {
                "sistema": "pereciveis",
                "problema_sistema": "reset_senha",
                "tipo_resposta": "sim"
            },
            "probsist_pereciveis_reset": 1
        },
        "action": {
            "reply": [
                "Sua senha foi resetada para #lasa2017."
            ],
            "defineContext": util.clearContext
        }
    },
    {
        "id": "probsist_pereciveis_reset_nao",
        "scoreRule": {
            "entities": {
                "sistema": "pereciveis",
                "problema_sistema": "reset_senha",
                "tipo_resposta": "nao"
            },
            "probsist_pereciveis_reset": 1
        },
        "action": {
            "reply": [
                "Ok, qualquer necessidade estou a disposição."
            ],
            "defineContext": util.clearContext
        }
    },    
];