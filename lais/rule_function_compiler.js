const util = require('util');
const _ = require('lodash');
const moment = require('moment');
const { get, add, clear, clearAll } = require('./../_extra/lais-conversation-definition/rules/util');
const RTCompiler = require('./../RTCompiler')({ get, add, clear, clearAll, util, _, moment});

class RuleFunctionCompiler {
  static compile(rules) {
    const compiledRules = rules.map((rule) => {
      RTCompiler.compileAttributes(rule, "match");

      rule.actions.forEach((action, i) => {
        // Não tem como saber se o goToDialog é uma string com o id do dialogo ou uma string com uma função.
        RTCompiler.compileAttributes(action, "match", "setContext"/*,"goToDialog"*/);
      });

      return rule;
    });

    return compiledRules
  }
}

module.exports = RuleFunctionCompiler;
