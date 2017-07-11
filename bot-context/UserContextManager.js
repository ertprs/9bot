let UserContextManager = function(){
    let me = {};
    let contextMap = {};

    me.getContext = function(ctxId, defaultDialog){
      let context = contextMap[ctxId];
      if(!context){
          contextMap[ctxId] = {"intents": [], "entities": {},
            "_dialog": defaultDialog, "lastRules": [], "repeatCount": 0,
            "__created":new Date()};
      }
      return contextMap[ctxId];
    };

    me.setContextFor = function(ctxId,ctx){
        contextMap[ctxId] = ctx;
    };

    me.clearAll = function(){
        contextMap = {};
    };



    return me;
};
let ucm = UserContextManager();
module.exports = ucm;
