let UserContextManager = function(){
    let me = {};
    let contextMap = {};

    me.getContext = function(ctxId){
      let context = contextMap[ctxId];
      if(!context){
          contextMap[ctxId] = {"__created":new Date()};
      }
      return contextMap[ctxId];
    };

    me.setContextFor = function(ctxId,ctx){
        let context = contextMap[ctxId];
        contextMap[ctxId] = ctx;
    };

    me.clearAll = function(){
        contextMap = {};
    };



    return me;
};
let ucm = UserContextManager();
module.exports = ucm;