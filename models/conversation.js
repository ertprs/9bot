const _ = require('lodash');
const fetch = require('node-fetch');
const BotFrameworkMessageBuilder = require('./../bot_framework_message_builder');
const endPointUrl = '/api/register/conversation';

class Conversation {
  static save({ context, session, from, to, message }) {
    if(!context || !session || !from || !to || !message) {
      throw new Error('Não é possível persistir uma mensagem sem passar os seguintes dados: ' +
        'contexto, sessão do Bot Framework, remetente, destinatário, e mensagem.');
    }

    let messageBuilder = new BotFrameworkMessageBuilder();

    // console.log('**********************************************************');
    // console.log({
    //   'contextId': context.id,
    //   'data': new Date(),
    //   'from': from,
    //   'para': to,
    //   'regra': _.last(context.lastRules),
    //   'tipoMessage': messageBuilder.getType(message),
    //   'mensagem': message,
    //   'tipocliente': session.message.address.channelId
    // });

    let params = { "contextId": context.id.toString(),
      "dateCreate": context.__created.toString(),
      "dialogs": [{
         "dateCreate": new Date().toString(),
         "dialogId": this._dialog.id.toString(),
         "from": from,
         "message": message,
         "messageType": messageBuilder.getType(message).toString(),
         "roleId": _.last(context.lastRules).toString(),
         "to": to
       }]
    };

    return fetch(endPointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Authorization'
      },
      body: JSON.stringify(params)
    })//.then(fetchUtils.handleEnvelope);
  }
}

module.exports = Conversation;
