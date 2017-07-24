const _ = require('lodash');
const fetch = require('node-fetch');
const BotFrameworkMessageBuilder = require('./../bot_framework_message_builder');
const endPointUrl = '';

class Conversation {
  static save({ context, session, from, to, message }) {
    if(!context || !session || !from || !to || !message) {
      throw new Error('Não é possível persistir uma mensagem sem passar os seguintes dados: ' +
        'contexto, sessão do Bot Framework, remetente, destinatário, e mensagem.');
    }

    let messageBuilder = new BotFrameworkMessageBuilder();

    return fetch(endPointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        'contextId': context.id,
        'data': new Date(),
        'from': from,
        'para': to,
        'regra': _.last(context.lastRules),
        'tipoMessage': messageBuilder.getType(message),
        'mensagem': message,
        'tipocliente': responseFromLAISCore.message.address.channel;
      })
    })
  }
}

module.exports = Conversation;
