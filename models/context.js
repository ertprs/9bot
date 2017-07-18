const sha1 = require('sha1');
const dialogs = require('../_extra/lais-conversation-definition/dialogs');
const conversationExpirationLimit = 7200; // Limite de tempo da conversação (em segundos).

class Context {
  constructor(userId) {
    this.id = `${new Date().getTime()}${sha1(userId)}`;
    this.userId = userId;
    this.intents = [];
    this.entities = {};
    this._dialog = dialogs.find((dialog) => { return dialog.id == "ROOT" });
    this.lastRules = [];
    this.repeatCount = 0;
    this.lastMessageTime = null;
    this.__created = new Date();
  }

  isExpired() {
    if(!this.lastMessageTime) {
      return false;
    } else {
      return (new Date() - this.lastMessageTime) > conversationExpirationLimit;
    }
  }

  updateLastMessageTime() {
    this.lastMessageTime = new Date();
  }
}

module.exports = Context;
