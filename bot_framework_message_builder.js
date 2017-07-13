const _ = require('lodash');
const builder = require('botbuilder');
const lais = require('./lais');
const ceatDictionary = require('./ceat-dictionary');
const laisDictionary = lais.Dictionary(ceatDictionary);

class BotFrameworkMessageBuilder {
  build(session, reply, context) {
    if(this.isTextReply(reply)) {
      return this.buildTextReply(session, reply, context);
    } else if(this.isMediaReply(reply)) {
      return this.buildMediaReply(session, reply, context);
    } else {
      throw new Error("Tipo de resposta não suportado: " + typeof(reply) +
        ". A resposta deve ser uma String (texto) ou um objeto (escolha ou mídia).");
    }
  }

  buildTextReply(session, reply, context) {
    let message = new builder.Message(session);
    return message.text(laisDictionary.resolveWithContext(reply, context))
  }

  buildMediaReply(session, reply, context) {
    let meta = reply.meta || {};
    let layout = meta.layout || builder.AttachmentLayout.carousel;

    if(!_.isArray(reply.content)) {
      reply.content = [reply.content];
    }

    return new builder.Message(session)
      .attachmentLayout(layout)
      .attachments(reply.content);
  }

  isTextReply(reply) {
    return _.isString(reply);
  }

  isMediaReply(reply) {
    return _.isObject(reply) && reply.type == "media";
  }
}

module.exports = BotFrameworkMessageBuilder;
