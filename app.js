require('dotenv').config();
require('console-stamp')(console, { pattern: "dd/mm/yyyy HH:MM:ss", label: true })

const restify = require('restify');
const fs = require('fs');
const util = require('util');
const builder = require('botbuilder');

const ContextManager = require('./models/context_manager');
const contextManager = new ContextManager();
const Conversation = require('./models/conversation');
const Dialog = require('./models/dialog');
const Rule = require('./models/rule');
const RuleFunctionCompiler = require('./lais/rule_function_compiler');

const LaisDialog = require('./lais/lais-dialog');
const _ = require('lodash');
const moment = require('moment');

const VERSAO_REGRAS='1.4';

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
    // nineBanner.print(); Comentado a pedido do Alex
    console.log('%s listening to %s', server.name, server.url);
    console.log('LAIS ver %s ONLINE', VERSAO_REGRAS);
    console.log('%s listening to %s', server.name, server.url);
});

const BotFrameworkMessageBuilder = require('./bot_framework_message_builder');
const messageBuilder = new BotFrameworkMessageBuilder();

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

let runMessageTypes = function (session) {
    if (session.message.text === '_card') {
        displayCarousel(session);
        return true;
    }
    return false;
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

let sendProactiveMessage = function (addr,textMessage) {
    // let hc = new builder.HeroCard()
    //     .title('Atenção')
    //     .subtitle('Item Coca-cola EAN 7894900700046 com 500 unidades em estoque está sem venda!')
    //     .images([
    //         builder.CardImage.create(null, 'IMAGEM!!!!!!')
    //     ]);
    //
    // let msg = new builder.Message().address(addr).attachments([
    //     // hc
    //     {
    //         "contentType": "image/png",
    //         "contentUrl": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABaCAMAAAAIGK1gAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlEQkQ0Q0E5NTdBNjExRTdBMTc2QzAyQzk1QTVGNjYwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlEQkQ0Q0FBNTdBNjExRTdBMTc2QzAyQzk1QTVGNjYwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OURCRDRDQTc1N0E2MTFFN0ExNzZDMDJDOTVBNUY2NjAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OURCRDRDQTg1N0E2MTFFN0ExNzZDMDJDOTVBNUY2NjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz46aShzAAABgFBMVEX/oKD+MjL/k5P/6en9CQn+UVH/nJz9GRn/X1//iYn+Q0P9Hx/+eXn+dXX9Njb9Ly/9AgL9FBT9Ozv9BQX9IyP9ERH//Pz/9PT/8vL9Jyf/8/P/+/v/rq7/sbH9Fhb9KCj9Bwf/8PD9JSX/sLD/srL9AQH/7+/9KSn/9/f9Cwv/y8v//f3/9vb/s7P/+Pj+cXH9DQ39JCT+fn7/l5f9Bgb/jo7/7u7+bW39Pj7/hYX/39//7e3/+fn9ISH/5+f/4eH9EhL/VVX/v7//paX/29v/0tL/1dX+Y2P/w8P/jIz/x8f/+vr+Vlb/6ur9HBz9Kyv+aGj/g4P/5OT+S0v/7Oz/Dw//5eX/4uL+Wlr+Rkb+ZWX/qan/qqr/zs7/goL/2dn+bGz/u7v/trb+enr/d3f+Z2f/8fH/t7f/yMj/vLz/uLj/ior/3Nz/f3//gID/wMD+b2//ra3/lZX/kZH/tbX+XFz/r6/+SEj9ODj+a2v/2Nj/lpb/xsb/////AAD////U0VAZAAAAgHRSTlP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ADgFS2cAAAMfSURBVHjazNplU+NQGIbhAoXiFEvdoMXdYXF3d7d1d+XZv74sZVjYpE2O5twfmzPtNdM0eSc9jt+K5+D6bsOZ+/sflpQFav1OXOd82agmMLCI2z5rSgJbcdelisDnuNdb9YB17feBvhblgB140JpqwB9dD4HRScWA+fivPbWAE9B1oBKwJ6wHumIKAR/DoFN1gL+MfEg0qAIMlBgCkaEpApxDij6qARypTwVsW1cCmI2UjakADCFN5/YDPQXpgENNtgOLkLYLu4FT7vTA8ml7gY1lMKnPXmAOTHPYCcyqNAeWbtoIzIWFZuwDjsNSs3YBW3zWgCsLNgHXYLE8e4CTUZ2kNu7xxyO6l50DtgD39L6aq+tieuGGHcAD/VfZfHVTtf5IUD4w5tIzPEmgX39k2SsdeGrwY7i6zeBQq2xgQ4IM6D6SC9QyQAZEsSYVmAlSIDplAtfbyIFbwxKBYyAHYlce8Bw0QJzJAjYN0QGr6iQBL0AHxGs5wOlyWmDXiRRgH2iByJcBdIAeiAnxwM1SFmC4RzhwBixArIoGzoINmJgXC1xYYQSiJCAUmAdWILpFAgec7MD6HYHADbADkS0OGAQPIOKigN5lPsACjyBgK/gAUSQGeOTmBSyfEgHUisELiLJGAcBO84dE/qTPa74yhz8wa8v8Y0NJYNB85egSd+CuhcdskZuHR4/aLSzN5Q08s/QgMFLt975vt7R0nC+wrgqciwxyBb4B9/p5Ak+6+AOdrzgC8yGgr/yAExDSIS+g0aYTHrmecAKuQlC9fIDzCVFAdwMPYKpNJ0bVNnv8IZ/19RY2rpgDuwl8sb+3uhoCYSY7cKfe+sel/p8k5caVbWZgNsE55bE8bt21yAqMk5z0fnIgnrIB0286oZ8H/1XRxAQsJLps+JLzINnk08ECHImSXdh81V5vkHAyc24zAN9BQpf0wMFKGcCwRg0ch5SeUQO75QB/UgML5QCPqYHHcoBz1MAvcoBn1EDPqAyfq4X+OtgpA+hgudUVifd1sE0zhwVieRUh1nkw8Ol7cWlUhC0a/tb7QmMeWO3ujwADAPuucQmIDhlBAAAAAElFTkSuQmCC',
    //         "name": 'warning.png'
    //     }
    // ]);
    // bot.send(addr,msg);

    let buildMsg = function(text){
        let msg2 = new builder.Message().address(addr);
        msg2.text(text);
        msg2.textLocale('pt-BR');
        return msg2;
    }

    bot.send(buildMsg('(n)'),function(){
        bot.send(buildMsg('Item Coca-cola EAN 7894900700046 com 500 unidades em estoque está sem venda!'));
    });
};

let runNotify = function(session){
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
        contextManager.clearAll();
        session.send("(worry) Do que a gente estava falando mesmo?!?!");
        return true;
    }
    return false;
};

let _globalUserAddressIndex = {};

let dialogs = [];
let rules = [];

Dialog.getAll().then((data) => {
  dialogs = data
}).then(() => {
  return Rule.getAll().then((data) => {
    rules = RuleFunctionCompiler.compile(data)
  })
}).then(() => {
    // Instanciando a engine de resolução de regras, passando os diálogos e as regras.
    let dialogEngine = new LaisDialog({ dialogs: dialogs, rules: rules});

    server.get('/update_rules', function (req, res) {
        Dialog.getAll().then((data) => {
          dialogEngine.setDialogs(data);
        }).then(() => {
          return Rule.getAll().then((data) => {
            dialogEngine.setRules(RuleFunctionCompiler.compile(data))
          })
        }).then(() => {
            res.send({ status: "Regras atualizadas" });
        })
    });

    bot.dialog('lais', [
        function (session, result) {
            // console.log("#####dialog.lais.message:", session.message);//, "######result:", result);
            let userId = session.message.address.user.id;
            let context = contextManager.getContext(userId);
            context.updateLastMessageTime();

            // console.log("get context for %s >>> %s",userId,JSON.stringify(context));
            _globalUserAddressIndex[session.message.address.user.id] = _globalUserAddressIndex[session.message.address.user.id] || session.message.address;

            let message = session.message;
            let s = session;

            if ( runReset(session) || runVersion(session) || runNotify(session) || runMessageTypes(session) ){
                return;
            }

            laisClient.talk(userId, message.text).then(data => {
              return dialogEngine.resolve(context, data, message.text);
            }).then((ret) => {
              contextManager.setContext(userId,ret.context);

              // Salvando a mensagem do usuário.
              Conversation.save({ context: ret.context, session: session,
                from: userId, to: "LAIS Bot", message: message.text });

              return ret.replies;
            })
                .then(replyArr => {
                    if (replyArr.length > 0) {
                        // console.log("respondendo reply:" + JSON.stringify(replyArr));
                        replyArr.forEach(reply => {
                            let message = messageBuilder.build(session, reply, {"ctx": session.message});
                            session.send(message);

                            // Salvando a mensagem do bot.
                            Conversation.save({ context: contextManager.getContext(userId),
                                session: session, from: "LAIS Bot", to: userId, message: reply });
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
                    console.error(err);
                    // console.log("ERROR:" + err.message);
                    session.send("(puke) \n Opss... Não estou me sentindo muito bem. Tente mais tarde.");
                });
        },

        function (session, results) {
            session.replaceDialog('lais', results);
        }]);
})
