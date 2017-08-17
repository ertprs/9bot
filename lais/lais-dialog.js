const _ = require('lodash');
const chalk = require('chalk');
const Context = require('./../models/context');

let LaisDialog = function(initArgs) {
  let me = {};
  let rules = [];
  let dialogs = [];
  let REPEAT_OVERFLOW = 30;
  let PROTECTED_ATTRIBUTES = ["_dialog", "lastRules", "repeatCount",
    "__created", "userMessage", "lastMessageTime"];

  function init() {
    if(!initArgs) {
      throw new Error('É necessário informar as regras e diálogos.');
    }

    rules = initArgs.rules;
    dialogs = initArgs.dialogs;
  }

  me.setDialogs = function(data) {
    dialogs = data;
  }

  me.setRules = function(data) {
    rules = data;
  }

  me.resolve = function(context, aiResponse, userMessage) {
    console.log(chalk.blue("aiResponse: "+JSON.stringify(aiResponse)));
    context = mergeContext(context, aiResponse, userMessage);
    console.log(chalk.cyan("context: "+JSON.stringify(context)));
    return resolveWithContext(context);
  };

  let resolveWithContext = function(context){
    console.log("resolveWithContext::context= "+JSON.stringify(context));
      let rule = getMatchingRule(context);
      context = updateRulesHistory(context, rule);
      console.log("resolveWithContext(2)::context= "+JSON.stringify(context));
      return applyActions(rule, context);
  };

  let mergeContext = function(context, aiResponse, userMessage) {
    context = mergeIntents(context, aiResponse);
    context = mergeEntities(context, aiResponse);
    context = addLastMessageFromUser(context, userMessage);

    return context;
  };

  let mergeIntents = function(context, aiResponse) {
    let currentDialog = context._dialog;

    if(_.includes(currentDialog.listenTo, 'intents')) {
      let filteredIntents = aiResponse.intents.filter(function(intent) {
        return intent.confidence >= currentDialog.minConfidence;
      });
      let orderedIntents = _.orderBy(filteredIntents, ['confidence'], ['desc']);

      // As intenções anteriores são removidas antes de adicionar as novas
      // intenções retornadas pela IA.
      context.intents = [];

      orderedIntents.forEach(function(intent) {
        context.intents.push(intent.intent);
      });
    }

    return context;
  };

  let mergeEntities = function(context, aiResponse) {
    let currentDialog = context._dialog;

    if(_.includes(currentDialog.listenTo, 'entities')) {
      aiResponse.entities.forEach(function(entity) {
        console.log(chalk.green("mergeEntities::eval %s",JSON.stringify(entity)));
        if(!context.entities[entity.entity]) {
          context.entities[entity.entity] = [];
        }
          console.log(chalk.green("mergeEntities::include ? %s",_.includes(context.entities[entity.entity], entity.value)));
        if(!_.includes(context.entities[entity.entity], entity.value)) {
          context.entities[entity.entity].push(entity.value);
        }
      });
    }

    return context;
  };

  let addLastMessageFromUser = function(context, userMessage) {
    context.userMessage = userMessage;

    return context;
  };

  let reduceByPriority = function (a, b) {
      let pa = (_.isNil(a.priority) ? 0 : a.priority), pb = (_.isNil(b.priority) ? 0 : b.priority);
      if (pa === pb) throw new Error("Não é possível determinar uma única regra de dialogo");
      return (pa > pb ? a : b);
  };

  let getMatchingRule = function(context) {
    let candidateRules = getCandidateRules(context);
    console.log(chalk.gray("candidates:"+candidateRules.map((r)=>r.id)));

    if(candidateRules.length === 0)  {
      throw new Error("No matching rule aplicable for context:"+JSON.stringify(context));
    }

    let matchingRule = candidateRules.reduce(reduceByPriority);
    console.log(chalk.gray("matching rule="+matchingRule.id));

    // Retorna apenas a regra com a maior prioridade.
    return matchingRule;
  };

  let getCandidateRules = function(context) {
    return rules.filter(function(rule) {
      return isRuleApplicabe(rule, context);
    });
  };

  let curryMatch = (f)=>(f ? f : _.stubTrue);

  let isRuleApplicabe = function(rule, context) {
    let isTheSameDialog = rule.dialog === context._dialog.id;

    if(isTheSameDialog){
      console.log(chalk.yellow(rule.id+">>"+ curryMatch(rule.match)(context)));
    }

    return isTheSameDialog && curryMatch(rule.match)(context);
  };

  let updateRulesHistory = function(context, rule) {
    if(_.last(context.lastRules) === rule.id) {
      context.repeatCount++;
    } else {
      context.repeatCount = 0;
    }

    context.lastRules.push(rule.id);

    if(context.lastRules.length > 5) {
      context.lastRules.shift();
    }

    return context;
  };

  let applyActions = function(rule, context) {
    console.log("applyActions::context="+JSON.stringify(context));
    let actions = getMatchingActions(rule, context);
    let replies = [];

    if(context.repeatCount >= REPEAT_OVERFLOW) {
      throw new Error("Maximum repeat overflow reached on rule: " + rule.id);
    }

    actions.forEach(function(action) {
      context = applyAction(action, context);

      if(action.replies) {
        replies = replies.concat(action.replies);
      }

      if(action.evaluateNext === true) {
        console.log("applyActions(2)::context="+JSON.stringify(context));
        let ret = resolveWithContext(context);//recursion
        context = ret.context;

        if(ret.replies) {
          replies = replies.concat(ret.replies);
        }
      }
    });

    console.log(chalk.grey("applyActions::retrun context="+JSON.stringify(context)));
    return { context, replies };
  };

  let getMatchingActions = function(rule, context) {
    return rule.actions.filter(function(action) {
      return !action.match || action.match(context);
    });
  };

  let getProtectedAttributes = function(context){
    return _.pick(context,PROTECTED_ATTRIBUTES);
  };

  let applyAction = function(action, context) {
    let protectedAttributes = getProtectedAttributes(context);
    context = setContext(action, _.cloneDeep(context));

    // Não estou usando o _.merge porque usando ele está gerando um bug
    // aonde o conteúdo do dialogs é modificado.
    for(property in protectedAttributes) {
      context[property] = protectedAttributes[property]
    }

    context = setDialog(action, context);

    return context;
  };

  let setContext = function(action, context) {
    if(action.setContext && _.isFunction(action.setContext)) {
      let newContextAsPlainObject = action.setContext(context.asPlainObject());
      _.merge(newContextAsPlainObject, { userId: context.userId });
      context = new Context(newContextAsPlainObject);
    }

    return context
  };

  let setDialog = function(action, context) {
    console.log(chalk.magenta("setDialog::context="+JSON.stringify(context)));
    let newDialogId = context._dialog.id;

    if(action.goToDialog) {
      if(_.isFunction(action.goToDialog)) {
        newDialogId = action.goToDialog(context.asPlainObject());
      } else {
        newDialogId = action.goToDialog;
      }
      let nextDialog = dialogs.find(function(dialog) {
        return dialog.id === newDialogId;
      });

      if(!nextDialog) {
        throw new Error("Couldn't find dialog with id:"+newDialogId);
      }

      console.log(chalk.magenta("setDialog::nextDialog="+nextDialog.id));

      context._dialog = _.cloneDeep(nextDialog);
    }

    return context;
  };

  init();

  return me;
};

module.exports = LaisDialog;
