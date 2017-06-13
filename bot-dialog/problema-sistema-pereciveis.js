const util = require('./util');
module.exports =[

    {
        "id": "probsist_pereciveis_problema_invalido",
        "priority":-2,
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"pereciveis",
                "problema_sistema":"*"
            }
        },
        "action": {
            "reply": [
                "Não consigo te ajudar com este problema neste sistema."
            ],
            "defineContext":util.clearContext
        }
    },

    {
        "id": "probsist_pereciveis_acesso",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"pereciveis",
                "problema_sistema":"acesso"
            }
        },
        "action": {
            "reply": [
                "Tente se logar usando seu usuário e senha do webloja.\n\n"
                +" Se não conseguir você deverá abrir um chamado para o webloja ou me solicitar para resetar sua senha"
            ],
            "defineContext":util.clearContext
        }
    },

    {
        "id": "probsist_pereciveis_loja_nao_associada",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"pereciveis",
                "problema_sistema":"loja_nao_associada"
            }
        },
        "action": {
            "reply": [
                "Você deve solicitar o acesso ao webloja"
            ],
            "defineContext":util.clearContext
        }
    },

    {
        "id": "probsist_pereciveis_sincronizacao",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"pereciveis",
                "problema_sistema":"sincronizacao"
            }
        },
        "action": {
            "reply": [
                "Tente seguir este procedimento para resolver seu problema:\n\n"
                +"Efetuar a desconexão e reconexão do aplicativo. Enviar imagem com o exemplo.\n\n"
                +"Favor entrar em configuração - aplicativos - perecíveis - armazenamento - apagar dados.\n\n"
                +"Desconecte da aplicação, selecionando o botão no canto superior direito, ao lado das palavras LOJA MOBILE, e depois entrar com o seu usuário e senha novamente.\n\n"
            ],
            "defineContext":util.clearContext
        }
    },

    {
        "id": "probsist_pereciveis_camera",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"pereciveis",
                "problema_sistema":"camera"
            }
        },
        "action": {
            "reply": [
                "Tente seguir este procedimento para resolver seu problema:\n\n"
                +"Para permitir a utilização da câmera, siga os seguintes passos:\n\n"
                +"a)Puxar a parte superior da tela para baixo;\n\n"
                +"b)Selecionar a opção “configurações”, representada pelo símbolo de uma engrenagem;\n\n"
                +"c)Selecionar a aba “geral”;\n\n"
                +"d)Selecionar a opção “Aplicativos”;\n\n"
                +"e)Selecione o aplicativo “Perecíveis”;\n\n"
                +"f)Selecione a opção “Permissões”;\n\n"
                +"g)Na opção câmera arraste o botão localizado do lado direito para a direita, habilitando a opção de utilização da câmera.\n\n"
                +"h)Entre novamente no aplicativo e confira se a câmera funcionou."
            ],
            "defineContext":util.clearContext
        }
    },

    {
        "id": "probsist_pereciveis_baixa_item",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"pereciveis",
                "problema_sistema":"baixa_item"
            }
        },
        "action": {
            "reply": [
                "Tente seguir este procedimento para resolver seu problema de BAIXA DE ITEM: INCLUIR_PROCEDIMENTO"
            ],
            "defineContext":util.clearContext
        }
    },

    {
        "id": "probsist_pereciveis_erro_inesperado",
        "scoreRule": {
            "intent": "problema_sistema",
            "entities":{
                "sistema":"pereciveis",
                "problema_sistema":"erro_inesperado"
            }
        },
        "action": {
            "reply": [
                "Infelizmente não há muito que possa fazer. Sugiro que entre em contato com a equipe de suporte"
            ],
            "defineContext":util.clearContext
        }
    }

];