require('dotenv').config();
const restify = require('restify');
const fs = require('fs');
const util = require('util');
const builder = require('botbuilder');
const nineBanner = require('./nine-banner');
const ctxManager = require('./bot-context/UserContextManager');

const VERSAO_REGRAS='1.2';

//carregar regras de dialogo
const botDialogFlow = require('./bot-dialog');

//carregar lib da lais
const lais = require('./lais');
const laisClient = lais.Client();

//carregar dicionario
const ceatDictionary = require('./ceat-dictionary');
const laisDictionary = lais.Dictionary(ceatDictionary);

// Create bot and add dialogs
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Setup Restify Server
const server = restify.createServer({ 'name': "lais-bot" });
server.post('/api/messages', connector.listen());
server.listen(process.env.port || process.env.PORT || 3978, function () {
    nineBanner.print();
    console.log('%s listening to %s', server.name, server.url);
});

const msgBuilder = require('./messageBuilder');


const bot = new builder.UniversalBot(connector,
    [
        function (session) {
            session.beginDialog('lais');
        }
    ]
);

let runVersion = function (session) {
    if (session.message.text === '_ver') {
        session.send("regras: "+VERSAO_REGRAS);
        return true;
    }
    return false;
};

let sendProactiveMessage = function (addr,textMessage) {

    let hc = new builder.HeroCard()
        .title('Atenção')
        .subtitle('Item Coca-cola EAN 7894900700046 com 500 unidades em estoque está sem venda!')
        .images([
            builder.CardImage.create(null, 'data:image/png;base64,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')
        ]);

    let msg = new builder.Message().address(addr).attachments([
        hc
    ]);
    bot.send(msg);
};

let runNotify = function(session){
    console.log('running notify!!!!!!!!!!!!!!!!!!!!!!!!!!!11');
    if (session.message.text === '_notify') {
        for(let addrId in _globalUserAddressIndex){
            sendProactiveMessage(_globalUserAddressIndex[addrId],"Atenção item sem venda!")
        }
        return true;
    }
    return false;
};

let runReset = function (session) {
    if (session.message.text === '_reset') {
        ctxManager.clearAll();
        session.send("(worry) Do que a gente estava falando mesmo?!?!");
        return true;
    }
    return false;
};

let _globalUserAddressIndex = {};

bot.dialog('lais', [
    function (session, result) {
        console.log("#####dialog.lais.message:", session.message);//, "######result:", result);
        let userId = session.message.address.user.id;
        let context = ctxManager.getContext(userId);

        context.dialogFlowResolver = context.dialogFlowResolver || lais.DialogFlowResolver({ 'flowDefinition': botDialogFlow });
        _globalUserAddressIndex[session.message.address.user.id] = _globalUserAddressIndex[session.message.address.user.id] || session.message.address;
        let dialogFlow = context.dialogFlowResolver;

        let message = session.message;
        let s = session;

        if ( runReset(session) || runVersion(session) || runNotify(session)){
            return;
        }

        laisClient.talk(message.text).then(data => {
            return dialogFlow.resolve(data);
        })
            .then(replyArr => {
                if (replyArr.length > 0) {
                    // console.log("respondendo reply:" + JSON.stringify(replyArr));
                    replyArr.forEach(reply => {
                        let msg = msgBuilder.build(session,reply,{"ctx":session.message});
                        session.send(msg);
                    });
                    console.log("respondido");
                } else {
                    console.log("Nenuma reply, responder mensagem padrão");
                    session.send("(worry) humm... Não tenho uma resposta para isso!");
                    console.log("respondido");
                }
            })
            // .then(msg => bot.reply(message, msg))
            .catch((err) => {
                console.log("ERROR:" + err.message);
                session.send("(puke) \n Opss... Não estou me sentindo muito bem. Tente mais tarde.");
            });
    },

    function (session, results) {
        session.replaceDialog('lais', results);
    }
]
);