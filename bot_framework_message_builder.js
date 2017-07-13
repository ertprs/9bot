const _ = require('lodash');
const builder = require('botbuilder');
const lais = require('./lais');
const ceatDictionary = require('./ceat-dictionary');
const laisDictionary = lais.Dictionary(ceatDictionary);

class BotFrameworkMessageBuilder {
  build(session, reply, context) {
    if(this.isTextReply(reply)) {
      return this.buildTextReply(session, reply, context);
    } else {
      throw new Error("Tipo de resposta não suportado: " + typeof(reply) +
        ". A resposta deve ser uma String (texto) ou um objeto (escolha ou mídia).");
    }
  }

  buildTextReply(session, reply, context) {
    let message = new builder.Message(session);
    return message.text(laisDictionary.resolveWithContext(reply, context))
  }

  isTextReply(reply) {
    return _.isString(reply);
  }
}

module.exports = BotFrameworkMessageBuilder;
