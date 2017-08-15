const Dialog = require('./../models/dialog');
const Rule = require('./../models/rule');
const RuleFunctionCompiler = require('./rule_function_compiler');

class DialogsAndRulesUpdater {
  static start(dialogs, rules) {
    setInterval(function() {
      Dialog.getAll().then((data) => {
        dialogs = data
      }).then(() => {
        return Rule.getAll().then((data) => {
          rules = RuleFunctionCompiler.compile(data)
        })
      })
    }, process.env.LAIS_ADM_DATA_UPDATER_INTERVAL);
  }
}

module.exports = DialogsAndRulesUpdater;
