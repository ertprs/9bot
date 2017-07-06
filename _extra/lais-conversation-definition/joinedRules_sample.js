module.exports={
    "dialogs": [
        {
            "id": "ROOT",
            "minConfidence": 0.6,
            "listenTo": [
                "intents",
                "entities"
            ]
        },
        {
            "id": "problema_sistema",
            "minConfidence": 0.6,
            "listenTo": [
                "intents",
                "entities"
            ]
        },
        {
            "id": "reset_senha",
            "minConfidence": 0.6,
            "listenTo": [
                "intents",
                "entities"
            ]
        },
        {
            "id": "reset_senha_logistica",
            "minConfidence": 0.6,
            "listenTo": [
                "intents",
                "entities"
            ]
        },
        {
            "id": "reset_senha_sap",
            "minConfidence": 0.6,
            "listenTo": [
                "intents",
                "entities"
            ]
        },
        {
            "id": "prob_sist_sap",
            "minConfidence": 0.6,
            "listenTo": [
                "intents",
                "entities"
            ]
        },
        {
            "id": "prob_sist_logistica",
            "minConfidence": 0.6,
            "listenTo": [
                "intents",
                "entities"
            ]
        },
        {
            "id": "prob_sist_logistica_login",
            "minConfidence": 0.6,
            "listenTo": [
                "intents",
                "entities"
            ]
        },
        {
            "id": "prob_sist_pereciveis",
            "minConfidence": 0.6,
            "listenTo": [
                "intents",
                "entities"
            ]
        }
    ],
    "rules": [
        {
            "id": "PLOG_login",
            "dialog": "prob_sist_logistica",
            "match": "(c)=>{\r\n            return get(\"entities.problema_sistema.0\",c)==='login'\r\n        }",
            "actions": [
                {
                    "replies": [
                        "Se nÃ£o estiver consguindo logar no Logistica Reversa, posso realizar um reset de senha. Deseja realizar o reset?."
                    ],
                    "goToDialog": "prob_sist_logistica_login"
                }
            ]
        },
        {
            "id": "PLOG_problema_invalido",
            "dialog": "prob_sist_logistica",
            "priority": -1,
            "match": "(c)=>{\r\n            return get(\"entities.problema_sistema.0\",c)!==null\r\n        }",
            "actions": [
                {
                    "replies": [
                        "Infelizmente nÃ£o sei como te ajudar com este problema no LogÃ­stica Reversa. Me fale se precisar de ajuda com mais alguma coisa."
                    ],
                    "setContext": "()=>{return {}}",
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "PLOGL_confirma",
            "dialog": "prob_sist_logistica_login",
            "match": "(c)=>{\r\n            return get(\"entities.tipo_resposta.0\",c)==='sim'\r\n        }",
            "actions": [
                {
                    "setContext": "(c)=>{c=clearAll(c);c.entities.sistema[0]=\"logistica_reversa\";return c}",
                    "goToDialog": "reset_senha"
                }
            ]
        },
        {
            "id": "PLOGL_cancela",
            "dialog": "prob_sist_sap_login",
            "match": "(c) => {\r\n            return get(\"entities.tipo_resposta.0\", c) === 'nao'\r\n        }",
            "actions": [
                {
                    "replies": [
                        "Procedimento cancelado."
                    ],
                    "setContext": "()=>{return {}}",
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "PLOGL_opt_invalida",
            "dialog": "prob_sist_sap_login",
            "match": "(c)=>{\r\n            return get(\"entities.tipo_resposta.0\",c)===null\r\n        }",
            "actions": [
                {
                    "match": "(c)=>get(\"count_PLOGL_opt_invalida\",c)<=1",
                    "replies": [
                        "Desculpe nÃ£o entendi. Gostaria de realizar o reset? (Responda com \"sim\" ou \"nÃ£o\")"
                    ]
                },
                {
                    "setContext": "(c)=>add(\"count_PLOGL_opt_invalida\",c)"
                },
                {
                    "match": "(c)=>get(\"count_PLOGL_opt_invalida\",c)>1",
                    "replies": [
                        "Desculpe nÃ£o entendi. Vou cancelar o procedimento agora. Se vocÃª desejar, poderÃ¡ solicitar novamente."
                    ],
                    "setContext": "()=>{return {}}",
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "PPER_login",
            "dialog": "prob_sist_pereciveis",
            "match": "(c)=>{\r\n            return get(\"entities.problema_sistema.0\",c)==='login'\r\n        }",
            "actions": [
                {
                    "replies": [
                        "PROCEDIMENTO DE LOGIN."
                    ],
                    "setContext": "()=>{return {}}",
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "PPER_camera",
            "dialog": "prob_sist_pereciveis",
            "match": "(c)=>{\r\n            return get(\"entities.problema_sistema.0\",c)==='camera'\r\n        }",
            "actions": [
                {
                    "replies": [
                        "PROCEDIMENTO DE CAMERA."
                    ],
                    "setContext": "()=>{return {}}",
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "PPER_sincronizacao",
            "dialog": "prob_sist_pereciveis",
            "match": "(c)=>{\r\n            return get(\"entities.problema_sistema.0\",c)==='sincronizacao'\r\n        }",
            "actions": [
                {
                    "replies": [
                        "PROCEDIMENTO DE SINCRONIZACAO."
                    ],
                    "setContext": "()=>{return {}}",
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "PPER_invalido",
            "dialog": "prob_sist_pereciveis",
            "priority": -1,
            "match": "(c)=>{\r\n            return get(\"entities.problema_sistema.0\",c)!==null\r\n        }",
            "actions": [
                {
                    "replies": [
                        "Infelizmente nÃ£o sei como te ajudar com esse problema."
                    ],
                    "setContext": "()=>{return {}}",
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "PSAP_login",
            "dialog": "prob_sist_sap",
            "match": "(c)=>{\r\n            return get(\"entities.problema_sistema.0\",c)==='login'\r\n        }",
            "actions": [
                {
                    "replies": [
                        "Se nÃ£o estiver consguindo logar no SAP, posso realizar um reset de senha. Deseja realizar o reset?."
                    ],
                    "goToDialog": "prob_sist_sap_login"
                }
            ]
        },
        {
            "id": "PSAP_problema_invalido",
            "dialog": "prob_sist_sap",
            "priority": -1,
            "match": "(c)=>{\r\n            return get(\"entities.problema_sistema.0\",c)!==null\r\n        }",
            "actions": [
                {
                    "replies": [
                        "Infelizmente nÃ£o sei como te ajudar com este problema no SAP. Me fale se precisar de ajuda com mais alguma coisa."
                    ],
                    "setContext": "()=>{return {}}",
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "PSAPL_confirma",
            "dialog": "prob_sist_sap_login",
            "match": "(c)=>{\r\n            return get(\"entities.tipo_resposta.0\",c)==='sim'\r\n        }",
            "actions": [
                {
                    "setContext": "(c)=>{c=clearAll(c);c.entities.sistema[0]=\"SAP\";return c}",
                    "goToDialog": "reset_senha"
                }
            ]
        },
        {
            "id": "PSAPL_cancela",
            "dialog": "prob_sist_sap_login",
            "match": "(c) => {\r\n            return get(\"entities.tipo_resposta.0\", c) === 'nao'\r\n        }",
            "actions": [
                {
                    "replies": [
                        "Procedimento cancelado."
                    ],
                    "setContext": "()=>{return {}}",
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "PSAPL_opt_invalida",
            "dialog": "prob_sist_sap_login",
            "match": "(c)=>{\r\n            return get(\"entities.tipo_resposta.0\",c)===null\r\n        }",
            "actions": [
                {
                    "match": "(c)=>get(\"count_PSAPL_opt_invalida\",c)<=1",
                    "replies": [
                        "Desculpe nÃ£o entendi. Gostaria de realizar o reset? (Responda com \"sim\" ou \"nÃ£o\")"
                    ]
                },
                {
                    "setContext": "(c)=>add(\"count_PSAPL_opt_invalida\",c)"
                },
                {
                    "match": "(c)=>get(\"count_PSAPL_opt_invalida\",c)>1",
                    "replies": [
                        "Desculpe nÃ£o entendi. Vou cancelar o procedimento agora. Se vocÃª desejar, poderÃ¡ solicitar novamente."
                    ],
                    "setContext": "()=>{return {}}",
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "PS_qual_sist_prob",
            "dialog": "problema_sistema",
            "match": "(c)=>{\r\n            return get(\"entities.sistema\",c)===null\r\n                && get(\"entities.problema_sistema\",c)===null\r\n        }",
            "actions": [
                {
                    "match": "(c)=>get(\"count_PS_qual_sist_prob\",c)<1",
                    "setContext": "(c)=>{c.count_PS_qual_sist_prob = add('count_PS_qual_sist_prob',c);return c}",
                    "replies": [
                        "Informe o sistema e o problema que vocÃª estÃ¡ tendo."
                    ]
                },
                {
                    "match": "(c)=>get(\"count_PS_qual_sist_prob\",c)===1",
                    "setContext": "(c)=>{c.count_PS_qual_sist_prob = add('count_PS_qual_sist_prob',c);return c}",
                    "replies": [
                        "NÃ£o entendi. Informe o sistema e o problema que vocÃª estÃ¡ tendo."
                    ]
                },
                {
                    "match": "(c)=>get(\"count_PS_qual_sist_prob\",c)>=2",
                    "setContext": "()=>{return {}}",
                    "replies": [
                        "Infelizmente nÃ£o consegui entender qual o problema ou o sistema informado. Estou aqui para o que precisar."
                    ],
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "PS_qual_sist",
            "dialog": "problema_sistema",
            "match": "(c)=>{\r\n            return get(\"entities.sistema\",c)===null\r\n                && get(\"entities.problema_sistema\",c)!==null\r\n        }",
            "actions": [
                {
                    "match": "(c)=>get(\"count_PS_qual_sist\",c)<1",
                    "replies": [
                        "Em qual sistema vocÃª estÃ¡ enfrentando esta dificuldade ?"
                    ]
                },
                {
                    "match": "(c)=>get(\"count_PS_qual_sist\",c)===1",
                    "replies": [
                        "NÃ£o entendi. Preciso que me informe o nome do sistema."
                    ]
                },
                {
                    "setContext": "(c)=>{c.count_PS_qual_sist = add('count_PS_qual_sist',c);return c}"
                },
                {
                    "match": "(c)=>get(\"count_PS_qual_sist\",c)>1",
                    "setContext": "(c)=>{c.count_PS_qual_sist = null;return c}",
                    "replies": [
                        "NÃ£o consegui identificar o sistema ao qual vocÃª se refere. Fale comigo se precisar de ajuda em outro ponto."
                    ]
                }
            ]
        },
        {
            "id": "PS_qual_prob",
            "dialog": "problema_sistema",
            "match": "(c)=>{\r\n            return get(\"entities.sistema\",c)!==null\r\n                && get(\"entities.problema_sistema\",c)===null\r\n        }",
            "actions": [
                {
                    "match": "(c)=>get(\"count_PS_qual_prob\",c)<1",
                    "replies": [
                        "Qual problema vocÃª estÃ¡ encontrando no sistema ?"
                    ]
                },
                {
                    "match": "(c)=>get(\"count_PS_qual_prob\",c)===1",
                    "replies": [
                        "NÃ£o consegui identificar o problema informado. Poderia descrever de outra forma ?"
                    ]
                },
                {
                    "setContext": "(c)=>{c.count_PS_qual_prob = add('count_PS_qual_prob',c);return c}"
                },
                {
                    "match": "(c)=>get(\"count_PS_qual_prob\",c)>1",
                    "replies": [
                        "NÃ£o entendi. Fale comigo se precisar de ajuda em outro ponto."
                    ]
                }
            ]
        },
        {
            "id": "PS_sist_sap",
            "dialog": "problema_sistema",
            "match": "(c)=>{\r\n            return get(\"entities.sistema\",c)==='SAP'\r\n                && get(\"entities.problema_sistema\",c)!==null\r\n        }",
            "actions": [
                {
                    "goToDialog": "prob_sist_sap"
                }
            ]
        },
        {
            "id": "PS_sist_logistica",
            "dialog": "problema_sistema",
            "match": "(c)=>{\r\n            return get(\"entities.sistema\",c)==='logistica'\r\n                && get(\"entities.problema_sistema\",c)!==null\r\n        }",
            "actions": [
                {
                    "goToDialog": "prob_sist_logistica"
                }
            ]
        },
        {
            "id": "PS_sist_pereciveis",
            "dialog": "problema_sistema",
            "match": "(c)=>{\r\n            return get(\"entities.sistema\",c)==='logistica'\r\n                && get(\"entities.problema_sistema\",c)!==null\r\n        }",
            "actions": [
                {
                    "goToDialog": "prob_sist_pereciveis"
                }
            ]
        },
        {
            "id": "RS_qual_sist",
            "dialog": "reset_senha",
            "match": "(c)=>{\r\n            return get(\"entities.sistema\",c)===null\r\n        }",
            "actions": [
                {
                    "match": "(c)=>get(\"count_RS_qual_sist\",c)===null",
                    "replies": [
                        "Informe para qual sistema vocÃª deseja realizar o reset de senha."
                    ]
                },
                {
                    "match": "(c)=>get(\"count_RS_qual_sist\",c)===1",
                    "replies": [
                        "NÃ£o entendi. Informe o nome do sistema."
                    ]
                },
                {
                    "setContext": "(c)=>{c.count_RS_qual_sist = add('count_RS_qual_sist',c);return c}"
                },
                {
                    "match": "(c)=>get(\"count_RS_qual_sist\",c)>=2",
                    "setContext": "(c)=>{c.count_RS_qual_sist = null;return c}",
                    "replies": [
                        "Infelizmente nÃ£o conheÃ§o o sistema informado, mas estou aqui para o que precisar."
                    ]
                }
            ]
        },
        {
            "id": "RS_sistema_invalido",
            "dialog": "reset_senha",
            "priority": -1,
            "match": "(c)=>{\r\n            return get(\"entities.sistema\",c)!==null\r\n        }",
            "actions": [
                {
                    "match": "(c)=>get(\"count_PS_qual_sist\",c)===null",
                    "replies": [
                        "Infelizmente nÃ£o posso realizar o reset de senha para este sistema."
                    ]
                }
            ]
        },
        {
            "id": "RS_sap",
            "dialog": "reset_senha",
            "priority": -1,
            "match": "(c)=>{\r\n            return get(\"entities.sistema.0\",c)===\"SAP\"\r\n        }",
            "actions": [
                {
                    "replies": [
                        "Informe o usuÃ¡rio do SAP para o qual deseja realizar o reset de senha."
                    ],
                    "goToDialog": "reset_senha_sap"
                }
            ]
        },
        {
            "id": "RLR_definir_usuario",
            "dialog": "reset_senha_logistica",
            "match": "(c)=>{\r\n            return get(\"usuario_logistica\",c)===null\r\n        }",
            "actions": [
                {
                    "setContext": "(c)=>{c.usuario_logistica = get('userMessage',c);return c}",
                    "evaluateNext": true
                }
            ]
        },
        {
            "id": "RLR_usuario_invalido",
            "dialog": "reset_senha_logistica",
            "match": "(c)=>{\r\n            return get(\"usuario_logistica\",c)==='invalido'\r\n        }",
            "actions": [
                {
                    "match": "(c)=>c.get(\"count_RLR_usuario_invalido\")<=1",
                    "setContext": "(c)=>{c.count_RLR_usuario_invalido = add(\"count_RLR_usuario_invalido\",c); return clear(c,\"usuario_logistica\")}",
                    "replies": [
                        "UsuÃ¡rio invÃ¡lido. Por favor, verifique o usuÃ¡rio e tente novamente. Informe o usuÃ¡rio do LogÃ­stica Reversa:"
                    ]
                },
                {
                    "match": "(c)=>c.get(\"count_RLR_usuario_invalido\")>=2",
                    "setContext": "()=>{return {}}",
                    "replies": [
                        "UsuÃ¡rio invÃ¡lido. Verifique o usuÃ¡rio e tente realizar o procedimento novamente. Em que mais posso ajudar?"
                    ],
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "RLR_usuario_valido_confirm",
            "dialog": "reset_senha_logistica",
            "priority": -1,
            "match": "(c)=>{\r\n            return (\r\n                get(\"usuario_logistica\",c)!==null\r\n                && get(\"entities.tipo_resposta.0\",c)===null\r\n            )\r\n        }",
            "actions": [
                {
                    "match": "(c)=>c.get(\"count_RLR_usuario_valido_confirm\")===null",
                    "setContext": "(c)=>{c.count_RLR_usuario_valido_confirm = add(\"count_RLR_usuario_valido_confirm\",c); return c}",
                    "replies": [
                        "Confirma o reset de senha para o SAP?"
                    ]
                },
                {
                    "match": "(c)=>c.get(\"count_RLR_usuario_valido_confirm\")===1",
                    "setContext": "(c)=>{c.count_RLR_usuario_valido_confirm = add(\"count_RLR_usuario_valido_confirm\",c); return c}",
                    "replies": [
                        "Confirma o reset de senha para o SAP?"
                    ]
                },
                {
                    "match": "(c)=>c.get(\"count_RLR_usuario_valido_confirm\")>=2",
                    "setContext": "()=>{return {}}",
                    "replies": [
                        "NÃ£o entendi. O processo foi abortado. Por favor tente novamente."
                    ],
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "RLR_reset_senha_confirmado",
            "dialog": "reset_senha_logistica",
            "match": "(c)=>{\r\n            return (\r\n                get(\"usuario_logistica\",c)!==null\r\n                && get(\"entities.tipo_resposta.0\",c)===true\r\n            )\r\n        }",
            "actions": [
                {
                    "setContext": "()=>{return {}}",
                    "replies": [
                        "Reset de senha realizado com sucesso! A nova senha Ã©: #lasa2017"
                    ],
                    "gotoDialog": "ROOT"
                }
            ]
        },
        {
            "id": "RLR_reset_senha_cancelado",
            "dialog": "reset_senha_logistica",
            "match": "(c)=>{\r\n            return (\r\n                get(\"usuario_logistica\",c)!==null\r\n                && get(\"entities.tipo_resposta.0\",c)===false\r\n            )\r\n        }",
            "actions": [
                {
                    "setContext": "()=>{return {}}",
                    "replies": [
                        "Procedimento cancelado."
                    ],
                    "gotoDialog": "ROOT"
                }
            ]
        },
        {
            "id": "RSAP_definir_usuario",
            "dialog": "reset_senha_sap",
            "match": "(c)=>{\r\n            return get(\"usuario_sap\",c)===null\r\n        }",
            "actions": [
                {
                    "setContext": "(c)=>{c.usuario_sap = get('userMessage',c);return c}",
                    "evaluateNext": true
                }
            ]
        },
        {
            "id": "RSAP_usuario_invalido",
            "dialog": "reset_senha_sap",
            "match": "(c)=>{\r\n            return get(\"usuario_sap\",c)==='invalido'\r\n        }",
            "actions": [
                {
                    "match": "(c)=>c.get(\"count_RSAP_usuario_invalido\")<=1",
                    "setContext": "(c)=>{c.count_RSAP_usuario_invalido = add(\"count_RSAP_usuario_invalido\",c); return clear(c,\"usuario_sap\")}",
                    "replies": [
                        "UsuÃ¡rio invÃ¡lido. Por favor, verifique o usuÃ¡rio e tente novamente. Informe o usuÃ¡rio do SAP:"
                    ]
                },
                {
                    "match": "(c)=>c.get(\"count_RSAP_usuario_invalido\")>=2",
                    "setContext": "()=>{return {}}",
                    "replies": [
                        "UsuÃ¡rio invÃ¡lido. Verifique o usuÃ¡rio e tente realizar o procedimento novamente. Em que mais posso ajudar?"
                    ],
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "RSAP_usuario_valido_confirm",
            "dialog": "reset_senha_sap",
            "priority": -1,
            "match": "(c)=>{\r\n            return (\r\n                get(\"usuario_sap\",c)!==null\r\n                && get(\"entities.tipo_resposta.0\",c)===null\r\n            )\r\n        }",
            "actions": [
                {
                    "match": "(c)=>c.get(\"count_RSAP_usuario_valido_confirm\")===null",
                    "setContext": "(c)=>{c.count_RSAP_usuario_valido_confirm = add(\"count_RSAP_usuario_valido_confirm\",c); return c}",
                    "replies": [
                        "Confirma o reset de senha para o SAP?"
                    ]
                },
                {
                    "match": "(c)=>c.get(\"count_RSAP_usuario_valido_confirm\")===1",
                    "setContext": "(c)=>{c.count_RSAP_usuario_valido_confirm = add(\"count_RSAP_usuario_valido_confirm\",c); return c}",
                    "replies": [
                        "Confirma o reset de senha para o SAP?"
                    ]
                },
                {
                    "match": "(c)=>c.get(\"count_RSAP_usuario_valido_confirm\")>=2",
                    "setContext": "()=>{return {}}",
                    "replies": [
                        "NÃ£o entendi. O processo foi abortado. Por favor tente novamente."
                    ],
                    "goToDialog": "ROOT"
                }
            ]
        },
        {
            "id": "RSAP_reset_senha_confirmado",
            "dialog": "reset_senha_sap",
            "match": "(c)=>{\r\n            return (\r\n                get(\"usuario_sap\",c)!==null\r\n                && get(\"entities.tipo_resposta.0\",c)===true\r\n            )\r\n        }",
            "actions": [
                {
                    "setContext": "()=>{return {}}",
                    "replies": [
                        "Reset de senha realizado com sucesso! A nova senha Ã©: #lasa2017"
                    ],
                    "gotoDialog": "ROOT"
                }
            ]
        },
        {
            "id": "RSAP_reset_senha_cancelado",
            "dialog": "reset_senha_sap",
            "match": "(c)=>{\r\n            return (\r\n                get(\"usuario_sap\",c)!==null\r\n                && get(\"entities.tipo_resposta.0\",c)===false\r\n            )\r\n        }",
            "actions": [
                {
                    "setContext": "()=>{return {}}",
                    "replies": [
                        "Procedimento cancelado."
                    ],
                    "gotoDialog": "ROOT"
                }
            ]
        },
        {
            "id": "ROOT_reset_senha",
            "dialog": "ROOT",
            "match": "(c)=>{\r\n            return get(\"entities.intent.0\",c)===\"reset_senha\"\r\n        }",
            "actions": [
                {
                    "evaluateNext": true,
                    "goToDialog": "reset_senha"
                }
            ]
        },
        {
            "id": "ROOT_problema_sistema",
            "dialog": "ROOT",
            "match": "(c) => {\r\n            return get(\"entities.intent.0\", c) === \"problema_sistema\"\r\n        }",
            "actions": [
                {
                    "evaluateNext": true,
                    "goToDialog": "problema_sistema"
                }
            ]
        },
        {
            "id": "ROOT_saudacao",
            "dialog": "ROOT",
            "match": "(c)=>get(\"entities.intent.0\", c) === \"saudacao\"",
            "actions": [
                {
                    "replies": [
                        "NÃ£o entendi o que vocÃª disse."
                    ]
                }
            ]
        },
        {
            "id": "ROOT_fallback",
            "dialog": "ROOT",
            "priority": -9999,
            "match": "()=>true",
            "actions": [
                {
                    "replies": [
                        "NÃ£o entendi o que vocÃª disse."
                    ]
                }
            ]
        }
    ]
};
