const {get,add,clear,clearAll} = require('./util');

module.exports = [
    {
        "id":"RLR_definir_usuario",
        "dialog":"reset_senha_logistica",
        "match":(c)=>{
            return get("usuario_logistica",c)===null
        },
        "actions":[
            {
                "setContext": (c)=>{c.usuario_logistica = get('userMessage',c);return c},
                "evaluateNext":true
            }
        ]
    },
    {
        "id":"RLR_usuario_invalido",
        "dialog":"reset_senha_logistica",
        "match":(c)=>{
            return get("usuario_logistica",c)==='invalido'
        },
        "actions":[
            {
                "match":(c)=>c.get("count_RLR_usuario_invalido")<=1,
                "setContext": (c)=>{c.count_RLR_usuario_invalido = add("count_RLR_usuario_invalido",c); return clear(c,"usuario_logistica")},
                "replies":[
                    "Usuário inválido. Por favor, verifique o usuário e tente novamente. Informe o usuário do Logística Reversa:"
                ]
            },
            {
                "match":(c)=>c.get("count_RLR_usuario_invalido")>=2,
                "setContext": clearAll,
                "replies":[
                    "Usuário inválido. Verifique o usuário e tente realizar o procedimento novamente. Em que mais posso ajudar?"
                ],
                "goToDialog":"ROOT"
            }
        ]
    },
    {
        "id":"RLR_usuario_valido_confirm",
        "dialog":"reset_senha_logistica",
        "priority":-1,
        "match":(c)=>{
            return (
                get("usuario_logistica",c)!==null
                && get("entities.tipo_resposta.0",c)===null
            )
        },
        "actions":[
            {
                "match":(c)=>c.get("count_RLR_usuario_valido_confirm")===null,
                "setContext": (c)=>{c.count_RLR_usuario_valido_confirm = add("count_RLR_usuario_valido_confirm",c); return c},
                "replies":[
                    "Confirma o reset de senha para o SAP?"
                ]
            },
            {
                "match":(c)=>c.get("count_RLR_usuario_valido_confirm")===1,
                "setContext": (c)=>{c.count_RLR_usuario_valido_confirm = add("count_RLR_usuario_valido_confirm",c); return c},
                "replies":[
                    "Confirma o reset de senha para o SAP?"
                ]
            },
            {
                "match":(c)=>c.get("count_RLR_usuario_valido_confirm")>=2,
                "setContext": clearAll,
                "replies":[
                    "Não entendi. O processo foi abortado. Por favor tente novamente."
                ],
                "goToDialog":"ROOT"
            }
        ]
    },
    {
        "id":"RLR_reset_senha_confirmado",
        "dialog":"reset_senha_logistica",
        "match":(c)=>{
            return (
                get("usuario_logistica",c)!==null
                && get("entities.tipo_resposta.0",c)===true
            )
        },
        "actions":[
            {
                "setContext": clearAll,
                "replies":[
                    "Reset de senha realizado com sucesso! A nova senha é: #lasa2017"
                ],
                "gotoDialog":"ROOT"
            }
        ]
    },
    {
        "id":"RLR_reset_senha_cancelado",
        "dialog":"reset_senha_logistica",
        "match":(c)=>{
            return (
                get("usuario_logistica",c)!==null
                && get("entities.tipo_resposta.0",c)===false
            )
        },
        "actions":[
            {
                "setContext": clearAll,
                "replies":[
                    "Procedimento cancelado."
                ],
                "gotoDialog":"ROOT"
            }
        ]
    }

];