const mb = require('../messageBuilder');
const _ = require('lodash');
let getUserName = function (ctx){
    return ctx;
};

let clearContext = function(ctx){
    let internal = ctx.__;
    let persistent = ctx.persistent;
    let newContext = {};
    newContext.__ = internal;
    newContext.persistent = persistent;
    if(newContext.__) newContext.__.listenOnly = ["intent","entities"];
    return newContext;
};

let replyChoices = function(title,choices){
    let arrTitle = title.split('|');
    let arrChoices = [];
    if(typeof choices==='string'){
        arrChoices = choices.split("|")
    }else if(_.isArray(arrChoices)){
        arrChoices = choices;
    }else{
        throw new Error("Invalid choices parameter. Expected String or Array.")
    }

    console.log("arrChoices:",arrChoices);
    let arrChoicesObj = arrChoices.map((c)=>{
       let arrTextValue = c.split("|");
       let text = arrTextValue[0] || "undefined";
       let val = arrTextValue[1] || text;
       return {"text":text,"value":val};
    });

    console.log("arrChoicesObj:",arrChoicesObj);
    return {
        "type":"choice",
        "meta":{"title":arrTitle[0],"subtitle":arrTitle[1],"text":arrTitle[2]},
        "content": arrChoicesObj
    };
};

module.exports = {
    getUserName,
    clearContext,
    replyChoices,
    buildClearContextAndDefine: function(newContext){
        return function(ctx){
            let ctxZerado = fnClearContext(ctx);
            return _.merge(ctxZerado,newContext);
        };
    }
};