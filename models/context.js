const sha1 = require('sha1');
const dialogs = require('../_extra/lais-conversation-definition/dialogs');
const conversationExpirationLimit = 7200; // Limite de tempo da conversação (em segundos).

class Context {
  constructor(options) {
    this.userId = options.userId;

    if(!this.userId) {
      throw new Error('O id do usuário é uma informação obrigatória para o contexto');
    }

    this.id = options.id || `${new Date().getTime()}${sha1(this.userId)}`;
    this.intents = options.intents || [];
    this.entities = options.entities || {};
    this._dialog = options._dialog || dialogs.find((dialog) => { return dialog.id == "ROOT" });
    this.lastRules = options.lastRules || [];
    this.repeatCount = options.repeatCount || 0;
    this.userMessage = options.userMessage || null;
    this.lastMessageTime = options.lastMessageTime || null;
    this.__created = options.__created || new Date();
  }

  isExpired() {
    if(!this.lastMessageTime) {
      return false;
    } else {
      return (new Date() - this.lastMessageTime) > conversationExpirationLimit * 1000;
    }
  }

  updateLastMessageTime() {
    this.lastMessageTime = new Date();
  }

  asPlainObject() {
    let plainObject = {}

    for(var property in this) {
      if (this.hasOwnProperty(property)) {
        plainObject[property] = this[property];
      }
    }

    return plainObject;
  }
}

module.exports = Context;
