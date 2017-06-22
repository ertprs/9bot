require('dotenv').config();
const restify = require('restify');
const fs = require('fs');
const util = require('util');
const builder = require('botbuilder');
const nineBanner = require('./nine-banner');
const ctxManager = require('./bot-context/UserContextManager');

const VERSAO_REGRAS='1.0';

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

let runVersion = function (session) {
    if (session.message.text === '_ver') {
        session.send("regras: "+VERSAO_REGRAS);
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

const bot = new builder.UniversalBot(connector,
    [
        function (session) {
            session.beginDialog('lais');
        }
    ]
);

bot.dialog('lais', [
    function (session, result) {
        console.log("#####dialog.lais.message.text:", session.message.text);//, "######result:", result);
        let userId = session.message.address.user.id;
        let context = ctxManager.getContext(userId);

        context.dialogFlowResolver = context.dialogFlowResolver || lais.DialogFlowResolver({ 'flowDefinition': botDialogFlow });
        let dialogFlow = context.dialogFlowResolver;

        let message = session.message;
        let s = session;

        if ( runReset(session) || runVersion(session)){
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