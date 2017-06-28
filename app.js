require('dotenv').config();
const restify = require('restify');
const fs = require('fs');
const util = require('util');
const builder = require('botbuilder');
const nineBanner = require('./nine-banner');
const ctxManager = require('./bot-context/UserContextManager');

const VERSAO_REGRAS='1.3';

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
    // nineBanner.print(); Comentado a pedido do Alex

    var today = moment().tz("America/Sao_Paulo");
    var curHr = parseInt(today.format('HH'));

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