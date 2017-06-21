//carregar lib da lais
const lais = require('./lais');
//carregar dicionario
const ceatDictionary = require('./ceat-dictionary');
const laisDictionary = lais.Dictionary(ceatDictionary);
const _ = require('lodash');

const builder = require('botbuilder');
const AttachmentLayout = {
    'COROUSEL':builder.AttachmentLayout.carousel,
    'LIST':builder.AttachmentLayout.list
};
const ReplyType = {
    "TEXT":"text",
    "CHOICE":"choice"
};

let resolvers = {
    [ReplyType.TEXT] : function(session,reply, ctx){
        let msg = new builder.Message(session);
        console.log('####msg:',msg);
        return msg.text(laisDictionary.resolveWithContext(reply.content,ctx))
    },
    /**
     *
     * @param session
     * @param reply
     *          reply.meta:
     *              {
     *                  "title":"Titulo",
     *                  "subtittle":"Subtitulo",
     *                  "text": "Text",
     *                  "layout":"list"
     *              }
     *          reply.content:
     *                  [{"text"}
     *                  ]
     * @param ctx
     * @returns {Message}
     */
    [ReplyType.CHOICE]: function(session,reply, ctx){
        let meta = reply.meta || {};
        let layout = meta.layout || AttachmentLayout.LIST;

        let msg = new builder.Message(session)
            .attachmentLayout(layout);

        let card =  new builder.HeroCard(session);

        if(meta.title){
            card = card.title(meta.title.toString());
        }
        if(meta.subtitle){
            card = card.subtitle(meta.subtitle.toString());
        }
        if(meta.text){
            card = card.text(meta.text.toString());
        }

        if(!_.isArray(reply.content)){
            throw new Error("Invalid choice content. Expected Array");
        }

        let cardActions = reply.content.map((e)=>{
            let opt = {};
           if(typeof e ==='string'){
               opt.text = laisDictionary.resolveWithContext(e,ctx);
               opt.value = opt.text;
           }else if(_.isObject(e)){
               let text = (e.text ? laisDictionary.resolveWithContext(e.text, ctx) : null);
               let value = (e.value ? laisDictionary.resolveWithContext(e.value, ctx) : null);
               opt.text = text || "Não definido";
               opt.value = value || text;
           } else{
               throw new Error("Invalid choice content element. Expected Object{text,value} or String");
           }
           return builder.CardAction.postBack(session, opt.text, opt.value);
        });

        return msg.attachments([card.buttons(cardActions)]);
    }
};

module.exports = {
    "build":function(session,reply,context){
        // console.log("reply: "+JSON.stringify(reply));
        if(typeof reply ==="string"){
            reply = {'type':"text","content":reply};
        }else if(!_.isObject(reply)){
            throw new Error("Unsupported reply type. Expected object{type,content,meta} or String.")
        }

        let resolver = resolvers[reply.type];
        // console.log("reply.type: "+reply.type);
        // console.log("resolver: "+resolver);
        if(!resolver){
            throw new Error("Invalid reply type \""+reply.type+"\".");
        }
        return resolver(session,reply,context);
    },
    AttachmentLayout,
    ReplyType
};