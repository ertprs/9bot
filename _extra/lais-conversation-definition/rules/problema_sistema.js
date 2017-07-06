const {get,add, clearAll} = require('./util');

module.exports = [
    {
        "id":"PS_qual_sist_prob",
        "dialog":"problema_sistema",
        "match":(c)=>{
            return get("entities.sistema",c)===null
                && get("entities.problema_sistema",c)===null
        },
        "actions":[
            {
                "match":(c)=>get("count_PS_qual_sist_prob",c)<1,
                "setContext": (c)=>{c.count_PS_qual_sist_prob = add('count_PS_qual_sist_prob',c);return c},
                "replies": [
                    "Informe o sistema e o problema que você está tendo."
                ]
            },
            {
                "match":(c)=>get("count_PS_qual_sist_prob",c)===1,
                "setContext": (c)=>{c.count_PS_qual_sist_prob = add('count_PS_qual_sist_prob',c);return c},
                "replies": [
                    "Não entendi. Informe o sistema e o problema que você está tendo."
                ]
            },
            {
                "match":(c)=>get("count_PS_qual_sist_prob",c)>=2,
                "setContext": clearAll,
                "replies": [
                    "Infelizmente não consegui entender qual o problema ou o sistema informado. Estou aqui para o que precisar."
                ],
                "goToDialog":"ROOT"
            }
        ]
    },
    {
        "id":"PS_qual_sist",
        "dialog":"problema_sistema",
        "match":(c)=>{
            return get("entities.sistema",c)===null
                && get("entities.problema_sistema",c)!==null
        },
        "actions":[
            {
                "match":(c)=>get("count_PS_qual_sist",c)<1,
                "replies": [
                    "Em qual sistema você está enfrentando esta dificuldade ?"
                ]
            },
            {
                "match":(c)=>get("count_PS_qual_sist",c)===1,
                "replies": [
                    "Não entendi. Preciso que me informe o nome do sistema."
                ]
            },
            {
                "setContext": (c)=>{c.count_PS_qual_sist = add('count_PS_qual_sist',c);return c}
            },
            {
                "match":(c)=>get("count_PS_qual_sist",c)>1,
                "replies": [
                    "Não consegui identificar o sistema ao qual você se refere. Fale comigo se precisar de ajuda em outro ponto."
                ],
                "setContext":clearAll,
                "goToDialog":"ROOT"
            },


        ]
    },
    {
        "id":"PS_qual_prob",
        "dialog":"problema_sistema",
        "match":(c)=>{
            return get("entities.sistema",c)!==null
                && get("entities.problema_sistema",c)===null
        },
        "actions":[
            {
                "match":(c)=>get("count_PS_qual_prob",c)<1,
                "replies": [
                    "Qual problema você está encontrando no sistema ?"
                ]
            },
            {
                "match":(c)=>get("count_PS_qual_prob",c)===1,
                "replies": [
                    "Não consegui identificar o problema informado. Poderia descrever de outra forma ?"
                ]
            },
            {
                "setContext": (c)=>{c.count_PS_qual_prob = add('count_PS_qual_prob',c);return c}
            },
            {
                "match":(c)=>get("count_PS_qual_prob",c)>1,
                "replies": [
                    "Não entendi. Fale comigo se precisar de ajuda em outro ponto."
                ],
                "setContext":clearAll,
                "goToDialog":"ROOT"
            }
        ]
    },
    {
        "id":"PS_sist_sap",
        "dialog":"problema_sistema",
        "match":(c)=>{
            return get("entities.sistema",c)==='sap'
                && get("entities.problema_sistema",c)!==null
        },
        "actions":[
            {
                "goToDialog":"prob_sist_sap"
            }
        ]
    },
    {
        "id":"PS_sist_logistica",
        "dialog":"problema_sistema",
        "match":(c)=>{
            return get("entities.sistema",c)==='logistica'
                && get("entities.problema_sistema",c)!==null
        },
        "actions":[
            {
                "goToDialog":"prob_sist_logistica"
            }
        ]
    },
    {
        "id":"PS_sist_pereciveis",
        "dialog":"problema_sistema",
        "match":(c)=>{
            return get("entities.sistema",c)==='logistica'
                && get("entities.problema_sistema",c)!==null
        },
        "actions":[
            {
                "goToDialog":"prob_sist_pereciveis"
            }
        ]
    }

];