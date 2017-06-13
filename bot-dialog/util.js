let fnClearContext = function(ctx){
    let internal = ctx.__;
    let persistent = ctx.persistent;
    let newContext = {};
    newContext.__ = internal;
    newContext.persistent = persistent;
    if(newContext.__) newContext.__.listenOnly = ["intent","entities"];
    return newContext;
};

module.exports = {
    clearContext: fnClearContext,
    buildClearContextAndDefine:function(newContext){
        return function(ctx){
            let ctxZerado = fnClearContext(ctx);
            return _.merge(ctxZerado,newContext);
        };
    }
};