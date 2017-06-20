require('dotenv').config();
const restify = require('restify');
const fs = require('fs');
const util = require('util');
const builder = require('botbuilder');
const nineBanner = require('./nine-banner');
const ctxManager = require('./bot-context/UserContextManager');

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

let runReset = function (session) {
    if (session.message.text === '_reset') {
        ctxManager.clearAll();
        session.send("(worry) Do que a gente estava falando mesmo?!?!");
        return true;
    }
    return false;
};

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
loadImage(IMAGES, 'lais', './bot-dialog/images/lais.png', 'image/png');
loadImage(IMAGES, 'lais_2', './bot-dialog/images/lais-2.jpg', 'image/jpg');
loadImage(IMAGES, 'sheldon', './bot-dialog/images/sheldon_gif.gif', 'image/gif');
loadImage(IMAGES, 'chart', './bot-dialog/images/chart.jpg', 'image/jpg');
loadImage(IMAGES, 'chart2', './bot-dialog/images/chart2.jpg', 'image/jpg');


let displayImages = function (session) {
    let images = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(
        [
            {
                "contentType": IMAGES.chart.contentType,
                "contentUrl": IMAGES.chart.url,
                "name": "chart.jpg"
            }

        ]
        );
    session.send(images);

    let images2 = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(
        [
            {
                "contentType": IMAGES.chart2.contentType,
                "contentUrl": IMAGES.chart2.url,
                "name": "chart2.jpg"
            }

        ]
        );
    session.send(images2);
};



let displayCarousel = function (session) {
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
        );
    session.send(carousselCards);
};

let displayHerCardButtons = function (session) {
    let heroCardButtons = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.list)
        .attachments([
            new builder.HeroCard(session)
                .title('Como você avalia estes recursos ?')
                .subtitle('seja honesto ')
                .buttons([
                    builder.CardAction.postBack(session, 'Não gostei', 'Não gostei :('),
                    builder.CardAction.postBack(session, 'Ok, vai', 'Mais ou menos'),
                    builder.CardAction.postBack(session, 'Legal', 'Legal'),
                    builder.CardAction.postBack(session, 'sensacional', 'Sensacional')
                ]),
        ]);
    session.send(heroCardButtons);
};

let runMessageTypes = function (session) {
    if (session.message.text === '_card') {
        displayCarousel(session);
        return true;
    } else if (session.message.text === '_choice') {
        displayHerCardButtons(session);
        return true;
    } else if (session.message.text === '_image') {
        displayImages(session);
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
        console.log("#####dialog.lais.message.text:", session.message.text, "######result:", result);
        let userId = session.message.address.user.id;
        let context = ctxManager.getContext(userId);

        context.dialogFlowResolver = context.dialogFlowResolver || lais.DialogFlowResolver({ 'flowDefinition': botDialogFlow });
        let dialogFlow = context.dialogFlowResolver;

        let message = session.message;
        let s = session;

        if (
            runReset(session)
            || runMessageTypes(session)) {
            return;
        }

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
            });
    },

    function (session, results) {
        session.replaceDialog('lais', results);
    }
]
);