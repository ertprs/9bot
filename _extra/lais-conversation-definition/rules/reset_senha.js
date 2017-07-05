const {get,add} = require('./util');

module.exports = [
    {
        "id":"RS_qual_sist",
        "dialog":"reset_senha",
        "match":(c)=>{
            return get("entities.sistema",c)===null
        },
        "actions":[
            {
                "match":(c)=>get("count_RS_qual_sist",c)===null,
                "replies": [
                    "Informe para qual sistema você deseja realizar o reset de senha."
                ]
            },
            {
                "match":(c)=>get("count_RS_qual_sist",c)===1,
                "replies": [
                    "Não entendi. Informe o nome do sistema."
                ]
            },
            {
                "setContext": (c)=>{c.count_RS_qual_sist = add('count_RS_qual_sist',c);return c}
            },
            {
                "match":(c)=>get("count_RS_qual_sist",c)>=2,
                "setContext": (c)=>{c.count_RS_qual_sist = null;return c},
                "replies": [
                    "Infelizmente não conheço o sistema informado, mas estou aqui para o que precisar."
                ]
            }
        ]
    },
    {
        "id":"RS_sistema_invalido",
        "dialog":"reset_senha",
        "priority":-1,
        "match":(c)=>{
            return get("entities.sistema",c)!==null
        },
        "actions":[
            {
                "match":(c)=>get("count_PS_qual_sist",c)===null,
                "replies": [
                    "Infelizmente não posso realizar o reset de senha para este sistema."
                ]
            }
        ]
    },
    {
        "id":"RS_sap",
        "dialog":"reset_senha",
        "priority":-1,
        "match":(c)=>{
            return get("entities.sistema.0",c)==="SAP"
        },
        "actions":[
            {
                "replies": [
                    "Informe o usuário do SAP para o qual deseja realizar o reset de senha."
                ],
                "gotToDialog":"reset_senha_sap"
            }
        ]
    }
];