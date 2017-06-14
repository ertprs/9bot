const Botkit = require('botkit');
const nineBanner = require('./nine-banner');
require('dotenv').config();
const controller = Botkit.botframeworkbot({
});
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
    appId: process.env.app_id,
    appPassword: process.env.app_password,
    require_delivery: true
});

// if you are already using Express, you can use your own server instance...
// see "Use BotKit with an Express web server"
controller.setupWebserver(PORT,function(err,webserver) {
    controller.createWebhookEndpoints(controller.webserver, bot, function() {
        nineBanner.print();
        console.log('This bot is online!!!');
    });
});




controller.hears(['_testContext:.*'], 'message_received', function(bot, message) {
    let userId = message.address.user.id;
    let context = userContextManager.getContext(userId);

    let novoContexto =  message.text.replace('_testContext:','');
    let novoContextoObj;
    try{
        novoContextoObj = JSON.parse(novoContexto);
    }catch(e){
        console.log("novoContexto:",novoContexto);
        bot.reply(message, "ops ocorreu um erro processando o seu json:"+e.message);
        return;
    }

    context.dialogFlowResolver =  context.dialogFlowResolver || lais.DialogFlowResolver({'flowDefinition':botDialogFlow});
    let dialogFR = context.dialogFlowResolver;

    try{
        let rule = dialogFR.getRuleForContext(novoContextoObj);
    }catch(e){
        bot.reply(message, "(puke) \n Opss... Não estou me sentindo muito bem. Tente mais tarde.",
            ()=> bot.reply(message, "erro:"+e.message)
        );
        return;
    }
    bot.reply(message, "winner >> "+JSON.stringify(rule,null,2));

});


controller.hears(['_updateAll:.*'], 'message_received', function(bot, message) {
    let novoDialogo =  message.text.replace('_updateAll:','');
    let novoDialogoObj;
    try{
        novoDialogoObj = JSON.parse(novoDialogo);
        lais.DialogFlowResolver({'flowDefinition':botDialogFlow});
    }catch(e){
        console.log("novoDialogo:",novoDialogo);
        bot.reply(message, "ops ocorreu um erro processando o seu json:"+e.message);
        return;
    }
    botDialogFlow = novoDialogoObj;
    // userContextManager.clearAll();
    bot.reply(message, "(llsshock) O que você fez comigo?!?! Me sinto diferente (penguin)");
});

controller.hears(['_update:.*'], 'message_received', function(bot, message) {

    let novoDialogo =  message.text.replace('_update:','');
    let userId = message.address.user.id;
    let context = userContextManager.getContext(userId);

    // console.log("novoDialogo:",novoDialogo);
    let novoDialogoObj;
    try{
        novoDialogoObj = JSON.parse(novoDialogo);
        context.dialogFlowResolver =  lais.DialogFlowResolver({'flowDefinition':botDialogFlow});
    }catch(e){
        bot.reply(message, "ops ocorreu um erro processando o seu json:"+e.message);
        return;
    }
    // botDialogFlow = novoDialogoObj;
    // userContextManager.clearAll();
    bot.reply(message, "(llsshock) O que você fez comigo?!?! Me sinto diferente (penguin)");
});

controller.hears(['_reset'], 'message_received', function(bot, message) {
    let userId = message.address.user.id;
    let context = userContextManager.clearAll();

    bot.reply(message, "(worry) Do que a gente estava falando mesmo?!?!");
    console.log("Contexts cleared");
});

controller.hears(['.*'], 'message_received', function(bot, message) {
    console.log("Mensagem Recebida:"+JSON.stringify(message.text)+" >> id:"+JSON.stringify(message.address.user.id));
    console.log(message);
    let userId = message.address.user.id;
    let context = userContextManager.getContext(userId);

    context.dialogFlowResolver =  context.dialogFlowResolver || lais.DialogFlowResolver({'flowDefinition':botDialogFlow});
    let dialogFR = context.dialogFlowResolver;

    console.log("context:"+JSON.stringify(context));

    laisClient.talk(message.text).then(data => {
        console.log("resolver mensagem recebida da AI");
        let ret = dialogFR.resolve(data);
        console.log("retorno:"+JSON.stringify(ret));
        return ret;
    })
        .then(replyArr => {
            if(replyArr.length>0){
                console.log("respondendo reply:"+JSON.stringify(replyArr));
                replyArr.forEach(msg=>{
                    if(typeof msg ==="string"){
                        msg = laisDictionary.resolve(msg);
                    }
                    bot.reply(message, msg)
                });
                console.log("respondido");

            }else{
                console.log("Nenuma reply, responder mensagem padrão");
                bot.reply(message, "(worry) humm... Não tenho uma resposta para isso!")
                console.log("respondido");
            }

        })
        // .then(msg => bot.reply(message, msg))
        .catch((err)=>{
            console.log("ERROR:"+err.message);

            bot.reply(message, "(puke) \n Opss... Não estou me sentindo muito bem. Tente mais tarde.",
                ()=> bot.reply(message, "erro:"+err.message,
                    ()=>bot.reply(message, "context >> "+JSON.stringify(dialogFR.getContext(),null,2))
                )
            );

        });
});

