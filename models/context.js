const dialogs = require('../_extra/lais-conversation-definition/dialogs');

class Context {
  constructor() {
    this.intents = [];
    this.entities = {};
    this._dialog = dialogs.find((dialog) => { dialog.id == "ROOT" });
    this.lastRules = [],
    this.repeatCount = 0;
    this.__created = new Date();
  }
}

module.exports = Context;
