const _ = require('lodash');
const fetch = require('node-fetch');
const BotFrameworkMessageBuilder = require('./../bot_framework_message_builder');

class Conversation {
  static save({ context, session, from, to, message }) {
    if(!context || !session || !from || !to || !message) {
      throw new Error('Não é possível persistir uma mensagem sem passar os seguintes dados: ' +
        'contexto, sessão do Bot Framework, remetente, destinatário, e mensagem.');
    }

    let messageBuilder = new BotFrameworkMessageBuilder();

    let params = { "contextId": context.id.toString(),
      "dateCreate": context.__created.toString(),
      "userId": from,
      "dialogs": [{
         "dateCreate": new Date().toString(),
         "dialogId": context._dialog.id.toString(),
         "from": from,
         "message": message,
         "messageType": messageBuilder.getType(message).toString(),
         "roleId": _.last(context.lastRules).toString(),
         "to": to
       }]
    };

    return fetch(process.env.LASA_CORE_SAVE_CONVERSATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Authorization'
      },
      body: JSON.stringify(params)
    })
  }
}

module.exports = Conversation;
