const Botkit = require('botkit');
const builder = require('botbuilder');
const fs = require('fs');
const util = require('util');

const nineBanner = require('./nine-banner');
require('dotenv').config();
const controller = Botkit.botframeworkbot({});
const userContextManager = require('./bot-context/UserContextManager');

const lais = require('./lais');
const laisClient = lais.Client();

const ceatDictionary = require('./ceat-dictionary');
const laisDictionary = lais.Dictionary(ceatDictionary);

const laisSimpleIntentResolver = lais.SimpleIntentResolver();

const PORT = (process.env.VCAP_APP_PORT || process.env.PORT || process.env.server_port || 5000);

//let botDialogFlow = require('./bot-dialog-flow');
let botDialogFlow = require('./bot-dialog');

let bot = controller.spawn({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD,
    require_delivery: true
});

// if you are already using Express, you can use your own server instance...
// see "Use BotKit with an Express web server"
controller.setupWebserver(PORT, function (err, webserver) {
    controller.createWebhookEndpoints(controller.webserver, bot, function () {
        nineBanner.print();
        console.log('This bot is online!!!');
    });
});

let IMAGES = {};
let loadImage = function (collection, id, path, contentType) {
    fs.readFile(path, function (err, data) {
        if (err) {
            throw err;
        }
        let base64 = Buffer.from(data).toString('base64');

        collection[id] = {
            "id": id,
            "url": util.format('data:%s;base64,%s', contentType, base64),
            "contentType": contentType
        };

    });
};
loadImage(IMAGES, 'lais', './bot-dialog/images/lais.png','image/png');
loadImage(IMAGES, 'lais_2', './bot-dialog/images/lais-2.jpg','image/jpg');
loadImage(IMAGES, 'sheldon', './bot-dialog/images/sheldon_gif.gif','image/gif');

controller.hears(['_messageTypes'], 'message_received', function (bot, message) {
    console.log("respondendo tipos de mensagem");

    bot.reply(message,
        {
            attachments: [
                new builder.HeroCard()
                    .images([
                        new builder.CardImage()
                            .alt("sheldon gif")
                            .url('https://secure.gravatar.com/avatar/5da7dfb7996539ebf85c91a7c6e37d8b.jpg?s=512&r=g&d=mm')
                    ])
                    .title("Este é o titulo do HeroCard")
                    .subtitle("Este é o subtitulo")
                    .text("Este é o texto - clique acima para realizar um postback")
                    .tap(builder.CardAction.postBack(null, "Clicou na 9bee!", "clicou na 9bee title"))
                    .toAttachment()
            ]
        }
    );

    let session = null;
    let carousselCards = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(
            [
                new builder.HeroCard(session)
                    .title('Azure Storage')
                    .subtitle('Offload the heavy lifting of data center management')
                    .text('Store and help protect your data. Get durable, highly available data storage across the globe and pay only for what you use.')
                    .images([
                        builder.CardImage.create(session, 'https://docs.microsoft.com/en-us/azure/storage/media/storage-introduction/storage-concepts.png')
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/storage/', 'Learn More')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('DocumentDB')
                    .subtitle('Blazing fast, planet-scale NoSQL')
                    .text('NoSQL service for highly available, globally distributed apps—take full advantage of SQL and JavaScript over document and key-value data without the hassles of on-premises or virtual machine-based cloud database options.')
                    .images([
                        builder.CardImage.create(session, 'https://docs.microsoft.com/en-us/azure/documentdb/media/documentdb-introduction/json-database-resources1.png')
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/documentdb/', 'Learn More')
                    ]),
                new builder.HeroCard(session)
                    .title('Azure Functions')
                    .subtitle('Process events with a serverless code architecture')
                    .text('An event-based serverless compute experience to accelerate your development. It can scale based on demand and you pay only for the resources you consume.')
                    .images([
                        builder.CardImage.create(session, 'https://azurecomcdn.azureedge.net/cvt-5daae9212bb433ad0510fbfbff44121ac7c759adc284d7a43d60dbbf2358a07a/images/page/services/functions/01-develop.png')
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/functions/', 'Learn More')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('Cognitive Services')
                    .subtitle('Build powerful intelligence into your applications to enable natural and contextual interactions')
                    .text('Enable natural and contextual interaction with tools that augment users\' experiences using the power of machine-based intelligence. Tap into an ever-growing collection of powerful artificial intelligence algorithms for vision, speech, language, and knowledge.')
                    .images([
                        builder.CardImage.create(session, 'https://azurecomcdn.azureedge.net/cvt-68b530dac63f0ccae8466a2610289af04bdc67ee0bfbc2d5e526b8efd10af05a/images/page/services/cognitive-services/cognitive-services.png')
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/cognitive-services/', 'Learn More')
                    ])
            ]
        )
        .toMessage();

    setTimeout(()=>{bot.reply(message, carousselCards)},500);

    let carousselImages = new builder.Message(session)
        // .attachmentLayout(builder.AttachmentLayout.list)
        .attachments([
                {
                    contentUrl: IMAGES.lais.url,
                    contentType: IMAGES.lais.contentType,
                    name: 'lais.png'
                },
                {
                    contentUrl: IMAGES.lais_2.url,
                    contentType: IMAGES.lais_2.contentType,
                    name: 'lais2.jpg'
                },
                {
                    contentUrl: IMAGES.sheldon.url,
                    contentType: IMAGES.sheldon.contentType,
                    name: 'sheldon.gif'
                }
            ]
        )
        .toMessage();

    setTimeout(()=>{bot.reply(message, carousselImages)},1000);

    // let choices =  builder.Prompts.choice(session, 'settings_intro', [
    //     "Opção 1",
    //     "Opção 2",
    //     "Opção 3",
    //     "Opção 4"
    // ]);

    let choices = function(listStyle){
        return[
            {
                "action":builder.CardAction.postBack(null, "Clicou na opção 1"),
                "value":listStyle+" opt 1",
                "synonyms":"Sym1|Sym1-1|Sym1-2"
            },
            {
                "action":builder.CardAction.postBack(null, "Clicou na opção 2"),
                "value":listStyle+" opt 2",
                "synonyms":"Sym2|Sym2-1|Sym2-2"
            },
            {
                "action":builder.CardAction.postBack(null, "Clicou na opção 3"),
                "value":listStyle+" opt 3",
                "synonyms":"Sym3|Sym3-1|Sym3-2"
            }
        ];
    };

    // let buttonPrompt = builder.PromptChoice.formatMessage(message,
    //     builder.ListStyle.button,
    //     "Escolha uma opção",
    //     choices("Button")
    // );
    //
    // let autoPrompt = builder.PromptChoice.formatMessage(null,
    //     builder.ListStyle.auto,
    //     "Escolha uma opção",
    //     choices("Auto")
    // );
    // let listPrompt = builder.PromptChoice.formatMessage(null,
    //     builder.ListStyle.list,
    //     "Escolha uma opção",
    //     choices("Button")
    // );

    // console.log("buttonPrompt:",buttonPrompt);

    // setTimeout(()=>{bot.reply(message, buttonPrompt )},1500);
    // setTimeout(()=>{bot.reply(message, autoPrompt)},1500);
    // setTimeout(()=>{bot.reply(message, listPrompt)},1500);

    console.log("respondido");
});


controller.hears(['_testContext:.*'], 'message_received', function (bot, message) {
    let userId = message.address.user.id;
    let context = userContextManager.getContext(userId);

    let novoContexto = message.text.replace('_testContext:', '');
    let novoContextoObj;
    try {
        novoContextoObj = JSON.parse(novoContexto);
    } catch (e) {
        console.log("novoContexto:", novoContexto);
        bot.reply(message, "ops ocorreu um erro processando o seu json:" + e.message);
        return;
    }

    context.dialogFlowResolver = context.dialogFlowResolver || lais.DialogFlowResolver({'flowDefinition': botDialogFlow});
    let dialogFR = context.dialogFlowResolver;

    try {
        let rule = dialogFR.getRuleForContext(novoContextoObj);
    } catch (e) {
        bot.reply(message, "(puke) \n Opss... Não estou me sentindo muito bem. Tente mais tarde.",
            () => bot.reply(message, "erro:" + e.message)
        );
        return;
    }
    bot.reply(message, "winner >> " + JSON.stringify(rule, null, 2));

});


controller.hears(['_updateAll:.*'], 'message_received', function (bot, message) {
    let novoDialogo = message.text.replace('_updateAll:', '');
    let novoDialogoObj;
    try {
        novoDialogoObj = JSON.parse(novoDialogo);
        lais.DialogFlowResolver({'flowDefinition': botDialogFlow});
    } catch (e) {
        console.log("novoDialogo:", novoDialogo);
        bot.reply(message, "ops ocorreu um erro processando o seu json:" + e.message);
        return;
    }
    botDialogFlow = novoDialogoObj;
    // userContextManager.clearAll();
    bot.reply(message, "(llsshock) O que você fez comigo?!?! Me sinto diferente (penguin)");
});

controller.hears(['_update:.*'], 'message_received', function (bot, message) {

    let novoDialogo = message.text.replace('_update:', '');
    let userId = message.address.user.id;
    let context = userContextManager.getContext(userId);

    // console.log("novoDialogo:",novoDialogo);
    let novoDialogoObj;
    try {
        novoDialogoObj = JSON.parse(novoDialogo);
        context.dialogFlowResolver = lais.DialogFlowResolver({'flowDefinition': botDialogFlow});
    } catch (e) {
        bot.reply(message, "ops ocorreu um erro processando o seu json:" + e.message);
        return;
    }
    // botDialogFlow = novoDialogoObj;
    // userContextManager.clearAll();
    bot.reply(message, "(llsshock) O que você fez comigo?!?! Me sinto diferente (penguin)");
});

controller.hears(['_reset'], 'message_received', function (bot, message) {
    let userId = message.address.user.id;
    let context = userContextManager.clearAll();

    bot.reply(message, "(worry) Do que a gente estava falando mesmo?!?!");
    console.log("Contexts cleared");
});

controller.hears(['.*'], 'message_received', function (bot, message) {
    console.log("Mensagem Recebida:" + JSON.stringify(message.text) + " >> id:" + JSON.stringify(message.address.user.id));
    console.log(message);
    let userId = message.address.user.id;
    let context = userContextManager.getContext(userId);

    context.dialogFlowResolver = context.dialogFlowResolver || lais.DialogFlowResolver({'flowDefinition': botDialogFlow});
    let dialogFR = context.dialogFlowResolver;

    console.log("context:" + JSON.stringify(context));

    laisClient.talk(message.text).then(data => {
        console.log("resolver mensagem recebida da AI");
        let ret = dialogFR.resolve(data);
        console.log("retorno:" + JSON.stringify(ret));
        return ret;
    })
        .then(replyArr => {
            if (replyArr.length > 0) {
                console.log("respondendo reply:" + JSON.stringify(replyArr));
                replyArr.forEach(msg => {
                    if (typeof msg === "string") {
                        msg = laisDictionary.resolve(msg);
                    }
                    bot.reply(message, msg)
                });
                console.log("respondido");

            } else {
                console.log("Nenuma reply, responder mensagem padrão");
                bot.reply(message, "(worry) humm... Não tenho uma resposta para isso!")
                console.log("respondido");
            }

        })
        // .then(msg => bot.reply(message, msg))
        .catch((err) => {
            console.log("ERROR:" + err.message);

            bot.reply(message, "(puke) \n Opss... Não estou me sentindo muito bem. Tente mais tarde.",
                () => bot.reply(message, "erro:" + err.message,
                    () => bot.reply(message, "context >> " + JSON.stringify(dialogFR.getContext(), null, 2))
                )
            );

        });
});

