module.exports = {
    "random_emoji":[
        "(yn)",
        ":)",
        ";)",
        "(like)"
    ],
    "reset_senha": [
        "(key) Sua senha foi redefinida para #lasa2017.\n\n"+
        "Para essa operação, foi gerado um chamado de número #00000001 já concluído. ;)"
    ],
    "resumo_pereciveis": [
        "O controle de perecíveis, permite que você faça a gestão de produtos com prazo de valida e que " +
        "possa atribuir um desconto progressivo para esse produto conforme a data de validade se aproxime."
    ],
    "acesso_senha": [
        "Tente se logar usando seu usuário e senha do webloja.\n\n"
        + "Se ainda sim não conseguir, é só me pedir para resetar a senha."
    ],
    "contexto_nao_entendido_ajuda_externa": [
        "Acho que vamos precisar de ajuda.\n\n" +
        "O que acha de abrir um chamado contando com o conteúdo dessa conversa?"
    ],
    "ajuda_geral": [
        "Atualmente eu posso tentar te ajudar com os tópicos abaixo:\n\n" +
        "- Problemas ou dúvidas com o aplicativo Perecíveis\n\n" +
        "- Reset de senha para alguns sistemas\n\n" +
        "- Problemas simples com PDV (PDV não está funcionando)"        
    ],
    "pai": [
        "Acredite ou não, tenho muitos pais, mas nenhuma mãe..."
    ],
    "palavrao": [
        "Opa, acho que alguém está de mau humor. Por favor, sem palavras ofensivas. (swear)",
        "Infelizmente não gosto de conversas com palavrões."
    ],
    "agradecimento": [
        "Disponha, estou aqui para ajudar.",
        "Estou a disposição!",
        "Sempre que precisar"
    ],
    "idade": [
        "Na nona dimensão tenho 45.987 anos.",
        "Isso não é algo que se pergunte para uma dama.",
        "Ainda sou muito jovem!"
    ],
    "saudacao_inicial": [
        "{{bomDiaNoiteTarde}}\n\n{{ajuda_geral}} ",
        "Olá. {{bomDiaNoiteTarde}}\n\n{{ajuda_geral}}",
        "Oi. {{bomDiaNoiteTarde}}\n\n{{ajuda_geral}}",
        "{{bomDiaNoiteTarde}}, em que posso ser útil?\n\n{{ajuda_geral}}",
        "Olá, meu nome é Lais, em que posso ajudar?\n\n{{ajuda_geral}}"
    ],

    "saudacao_geral": [
        "oi",
        "olá",
        "pois não",
        "posso ajudar?"
    ],
    "deNada": [
        "de nada",
        "obrigado eu",
        "não há de que",
        "não tem de quê",
        "por nada",
        "disponha",
        "imagina",
        "às ordens"
    ],
    "bomDiaNoiteTarde": function () {
        var today = new Date()
        var curHr = today.getHours()
        var ret = "";
        if (curHr < 12) {
            ret = "bom dia";
        } else if (curHr < 18) {
            ret = "boa tarde";
        } else {
            ret = "boa noite";
        }
        return ret;//.concat(curHr);
    },
    "possoAjudar_EOL": [
        "em que posso ajudar ?",
        "como posso ser útil ?",
        "precisa de ajuda ?",
        "o que está precisando ?",
        "como posso lhe ajudar hoje ?"
    ]
};


