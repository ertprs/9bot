const _ = require('lodash');

let DialogFlowResolver = function(initArgs){
    let me = {};
    let flowDefinition = [],
        context = {},
        defaultContext = {"persistent":{},"__":{"listenOnly":["intent","entities"],"lastNode":null,"lastNodes":[]}},
        replyPromise = null, //lazy populated
    INTENT_CONFIDENCE_THRESHOLD = 0.7
    ;

    let init = function(){
        if(!initArgs) throw new Error("Argumentos de inicialização não definidos");
        flowDefinition = initArgs.flowDefinition || flowDefinition;
        parseFlowDefinition();
        context = initArgs.context || context;
        context = Object.assign(defaultContext,context);
    };

    let uuid = function(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    let isObject = function(a) {
        return (!!a) && (a.constructor === Object);
    };
    let isFunction = function(object) {
        return _.isFunction(object);
    };
    let filterDuplicates = function(elem, pos,arr) {
        return arr.indexOf(elem) == pos;
    };

    let parseFlowDefinition = function(){
        flowDefinition = flowDefinition.map(setFlowRuleDefaults);
    };

    let setFlowRuleDefaults = function(fr){
        fr.id = (fr.id || uuid());
        fr.priority = (fr.priority || 0);
        fr.fromNode = (fr.fromNode || "*");
        fr.scoreRule = (fr.scoreRule || function(){return false});
        fr.action = (fr.action || {});
        fr.action.reply = (fr.action.reply || []);
        //fr.setListenOnly = fr.setListenOnly; default value is undefined
        return fr;
    };

    let convertAiResponseToScoreRule = function(aiResponse){
        let ret = {};
        let topScoringIntent;
        console.log("aiResponse:"+JSON.stringify(aiResponse));
        if(aiResponse.intents){
            topScoringIntent= aiResponse.intents
                .filter(function(e){return e.confidence>INTENT_CONFIDENCE_THRESHOLD})
                .reduce(function(a,b){
                    return (a.confidence>b.confidence?a:b)
                },{intent:null,confidence:0});
            ret.intent = topScoringIntent.intent;
        }
        //TODO: Neste cenário, estará sobrescrevendo entidades,
        //      mas multiplas entidades ainda não são suportadas
        let entities = {};
        if(aiResponse.entities){
            aiResponse.entities.forEach(function(e){
                entities[e.entity] = e.value;
            });
            ret.entities = entities;
        }
        return ret;
    };

    let mergeMessageIntoContext = function(aiResponse){
        if(!aiResponse) return;
        let aiContextToMerge = {};
        let parsedAiResponse = convertAiResponseToScoreRule(aiResponse);
        console.log("aiParsedContext:"+JSON.stringify(parsedAiResponse));
        context.__.listenOnly.forEach(function(attr){
            aiContextToMerge[attr] = parsedAiResponse[attr];
        });

        if(aiContextToMerge.intent===null){
            context.intent = null;
        }else{
            context.intent = aiContextToMerge.intent || context.intent;
        }

        console.log("context.entities:"+JSON.stringify(aiContextToMerge));
        // console.log("context:",context);
        console.log("context.entities:"+JSON.stringify(context.entities));
        context.entities = _.merge((context.entities||{}),aiContextToMerge.entities);
        console.log("mergedContext:"+JSON.stringify(context));
        //Object.assign({},context.entities,aiContextToMerge.entities);
    };

    let allElementsMatch = function(src,ref,refAttr){
        // console.log("src:",src,"ref:",ref);
        let ret,detail = "";
        if(src==="*"){
            detail = "src==='*'";
            ret = (typeof ref !== "undefined" && ref !== null);
        }
        else if(src===null){
            detail = "src===null";
            ret = (typeof ref === "undefined" || ref === null);
        }
        else if(isObject(src) && isObject(ref)){
            // console.log("src is object");
            ret = true;
            for(let attr in src){
                let test = allElementsMatch(src[attr],ref[attr],attr);
                if (test === false){
                    ret = false;
                    break;
                }
            }
        }
        else{
            detail = "src===ref";
            ret = (src === ref);
        }
        if(ret===false && typeof refAttr !== "undefined" && refAttr !== null){
            //console.log("(FALSE)Rule broke on ("+refAttr+"):"+detail)
        }

        return ret;
    };

    let filterFromNode = function(fr){
        return fr.fromNode==="*" || fr.fromNode===context.__.lastNode;
    };

    let isRuleApplicableForContext = function(fr){
        let ret;
        // console.group();
        //console.log("evaluating rule: "+fr.id);
        if(isObject(fr.scoreRule)){
            // console.log("allElementsMatch("+JSON.stringify(fr.scoreRule)+","+JSON.stringify(context)+")");
            ret = allElementsMatch(fr.scoreRule,context);
            if(ret===true)console.log("\t"+fr.id+": (TURE) Aplicable rule.["+fr.priority+"]");
        }
        else if(isFunction(fr.scoreRule)){
            ret = fr.scoreRule(context);
        }
        else{
            throw Error("Unsupported flow rule type in rule: "+fr.id);
        }
        // console.groupEnd();
        return ret;
    };

    let electWinner = function(candidateRules){
        if(candidateRules.length===1) return candidateRules[0];
        let uniquePriorities = candidateRules
            .map(function(e){
                return e.priority;
            })
            .filter(filterDuplicates);

        console.log("Unique Priorities("+uniquePriorities.length+"):"+JSON.stringify(uniquePriorities));
        if(uniquePriorities.length<=1){
            if(uniquePriorities.length===0){
                throw new Error("Cannot elect winner rule from candidate rules.No candidates found");
            }else{
                let errData = candidateRules.map((c)=>{
                    return {"id":c.id,"scoreRule":c.scoreRule}
                });
                throw new Error("Cannot elect winner rule from candidate rules. candidates= "+JSON.stringify(errData,null,2)+"\ncontext="+JSON.stringify(context,null,2));
            }
        }

        return candidateRules.reduce(function(ant,atual){
            return (ant.priority>atual.priority? ant: atual)
        })
    };

    let addLastRuleToContext = function(flowRule){
        context.__.lastNodes.unshift(flowRule.id);
        context.__.lastNodes = context.__.lastNodes.slice(0,5);
        context.__.lastNode = flowRule.id;
    };

    let getWinnerRule = function(){
        console.log("----------- Evaluating rules -----------");
        let candidates = flowDefinition.filter(filterFromNode).filter(isRuleApplicableForContext);
        console.log("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");
        return electWinner(candidates);
    };

    let applyDefineContext = function(defineContextAttr){
        if(!defineContextAttr) return;
        //console.log('applyDefineContext.context:',context);
        if(isFunction(defineContextAttr)){
            context = defineContextAttr(context);
        }

        else if(isObject(defineContextAttr)){
            _.merge(context,defineContextAttr);
        }
        //console.log('applyDefineContext.context.after:',context);
    };

    let applyListenTo = function(listenToAttr){
        console.log("listenToAttr:"+listenToAttr);
        if(!listenToAttr) return;
        if(!_.isArray(listenToAttr)){
            listenToAttr = [listenToAttr];
        }
        context.__.listenOnly = listenToAttr;
    };

    let applyRule = function(flowRule){
        if(!flowRule.action) return;
        //processar replies
        let originalReplies = flowRule.action.reply;
        //processar defineContext
        applyDefineContext(flowRule.action.defineContext);
        //processar listenOnlyto
        applyListenTo(flowRule.action.listenTo);
        //processar proccessNext
        if(flowRule.action.evaluateNow===true){
            console.log("evaluate next");
            let nextFlowRule = _.cloneDeep(getAppliedRule());
            console.log("evaluated rule:"+JSON.stringify(nextFlowRule));
            if(nextFlowRule.action){
                nextFlowRule.action.reply = nextFlowRule.action.reply || [];
                nextFlowRule.action.reply = nextFlowRule.action.reply.concat(originalReplies || [])
            }
            return nextFlowRule;
        }
        return flowRule;

    };

    // me.applyRule = applyRule;

    me.getRuleForContext = function(novoContexto){
        console.log("##################################################");
        console.log("##################################################");
        console.log("##################################################");
        let originalContext = context;
        context = novoContexto;
        let winner = getWinnerRule();
        context = originalContext;

        console.log("##################################################");
        console.log("##################################################");
        console.log("##################################################");

        return winner;
    };

    me.getRule = function(aiResponse){
        mergeMessageIntoContext(aiResponse);
        let winner = getWinnerRule();
        addLastRuleToContext(winner);//TODO Não deve ser chamado neste metodo
        console.log("Winner:"+JSON.stringify(winner));
        //console.log("Winner:"+JSON.stringify(_.merge({},winner,{'action':{'reply':"[Ommited Object]"}}) ));
        console.log("Context:"+JSON.stringify(context));

        return winner;
    };

    let getAppliedRule = function(aiResponse){
        let rule = me.getRule(aiResponse);
        rule = applyRule(rule);
        return rule;
    };

    me.resolve = function(aiResponse){
        let rule = getAppliedRule(aiResponse);
        if(rule.action){
            return rule.action.reply;
        }
    };

    me.getContext = function(){
        return Object.assign({},context);
    };

    init();
    return me;
};

module.exports = DialogFlowResolver;