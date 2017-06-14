require('dotenv').config();
const restify = require('restify');
const builder = require('botbuilder');
const nineBanner = require('./nine-banner');

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
const server = restify.createServer({'name':"lais-bot"});
server.post('/api/messages', connector.listen());
server.listen(process.env.port || process.env.PORT || 3978, function () {
    nineBanner.print();
    console.log('%s listening to %s', server.name, server.url);

});

// const bot = new builder.UniversalBot(connector,
const bot = new builder.UniversalBot(connector);
bot.beginDialogAction('_reset', '/reset', { matches: /^_restet/i });
bot.dialog('/',
    [
        function (session) {

            let dialogFlow = session.privateConversationData.dialogFlowResolver || lais.DialogFlowResolver({'flowDefinition': botDialogFlow});
            let message = session.message;
            let s  = session;

            laisClient.talk(message.text).then(data => {
                return dialogFlow.resolve(data);
            })
                .then(replyArr => {
                    if (replyArr.length > 0) {
                        console.log("respondendo reply:" + JSON.stringify(replyArr));
                        replyArr.forEach(msg => {
                            if (typeof msg === "string") {
                                msg = laisDictionary.resolve(msg);
                            }
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

                    // session.reply(message, "(puke) \n Opss... Não estou me sentindo muito bem. Tente mais tarde.",
                    //     () => bot.reply(message, "erro:" + err.message,
                    //         () => bot.reply(message, "context >> " + JSON.stringify(dialogFR.getContext(), null, 2))
                    //     )
                    // );

                });
        }
    ]
);


bot.dialog('/reset', [
    function (session) {
        lais.DialogFlowResolver({'flowDefinition': botDialogFlow});
        session.endDialog("(worry) Do que a gente estava falando mesmo?!?!");
        console.log("___________CONTEXT__CLEARED___________")
    }
]);