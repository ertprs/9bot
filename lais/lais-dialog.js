const _ = require('lodash');

let LaisDialog = function(initArgs) {
  let me = {};
  let rules = [];
  let dialogs = [];

  function init() {
    if(!initArgs) {
      throw new Error('É necessário informar as regras e diálogos.');
    }

    rules = initArgs.rules;
    dialogs = initArgs.dialogs;
  }

  me.resolve = function(context, aiResponse, userMessage) {
    context = mergeContext(context, aiResponse, userMessage);
    let rule = getMatchingRule(context);
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
        if(!context.entities[entity.entity]) {
          context.entities[entity.entity] = [];
        }

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
  }

  let getMatchingRule = function(context) {
    let candidateRules = getCandidateRules(context);
    let matchingRule = _.sortBy(candidateRules, ['priority'], ['desc']);

    // Retorna apenas uma regra, no caso a com a maior prioridade.
    return matchingRule[0];
  };

  let getCandidateRules = function(context) {
    let candidateRules = rules.filter(function(rule) {
      return isRuleApplicabe(rule, context);
    });

    return candidateRules;
  };

  let isRuleApplicabe = function(rule, context){
    let isTheSameDialog = rule.dialog == context._dialog.id;

    return isTheSameDialog && rule.match(context);
  };

  let applyActions = function(rule, context) {
    let actions = getMatchingActions(rule, context);
    let replies = [];

    actions.forEach(function(action) {
      actionResponse = applyAction(action, context);
      context = actionResponse.context;
      replies = replies.concat(actionResponse.replies);
    });

    return { context: context, replies: replies };
  };

  let getMatchingActions = function(rule, context) {
    let matchingActions = rule.actions.filter(function(action) {
      return action.match(context);
    });
    return matchingActions;
  };

  let applyAction = function(action, context) {
    context = action.setContext(context);
    context = setDialog(rule, context);

    let replies = [];
    actions.forEach(function(action) {
      replies = replies.concat(action.replies);
    });

    return { context: context, replies: replies };
  };

  let setDialog = function(action, context) {
    if(_.isFunction(action.goToDialog)) {
      let newDialogId = action.goToDialog(context);
    } else {
      let newDialogId = action.goToDialog;
    }

    context.dialog = dialogs.find(function(dialog) {
      return dialog.id == newDialogId;
    });

    return context;
  };

  init();

  return me;
};

module.exports = LaisDialog
