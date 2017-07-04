const {get,add} = require('./util');

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
                "match":(c)=>get("count_PS_qual_sist_prob",c)===null,
                "setContext": (c)=>{c.count_PS_qual_sist_prob = add('count_PS_qual_sist_prob',c);return c},
                "replies": [
                    "Informe o sistema e o problema que você está tendo."
                ]
            },
            {
                "match":(c)=>get("count_PS_qual_sist_prob",c)!==null,
                "setContext": (c)=>{c.count_PS_qual_sist_prob = null;return c},
                "replies": [
                    "Infelizmente não consegui entender qual o problema ou o sistema informado. Estou aqui para o que precisar."
                ]
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
                "match":(c)=>get("count_PS_qual_sist",c)===null,
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
                "setContext": (c)=>{c.count_PS_qual_sist = null;return c},
                "replies": [
                    "Não consegui identificar o sistema ao qual você se refere. Fale comigo se precisar de ajuda em outro ponto."
                ]
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
                "match":(c)=>get("count_PS_qual_prob",c)===null,
                "setContext": (c)=>{c.count_PS_qual_prob = add('count_PS_qual_prob',c);return c},
                "replies": [
                    "Qual problema você está encontrando no sistema ?"
                ]
            },
            {
                "match":(c)=>get("count_PS_qual_prob",c)!==null,
                "setContext": (c)=>{c.count_PS_qual_prob = null;return c},
                "replies": [
                    "Não . Fale comigo se precisar de ajuda em outro ponto."
                ]
            }
        ]
    }
];