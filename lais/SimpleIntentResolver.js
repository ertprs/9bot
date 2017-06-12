
let SimpleIntentResolver = function(config){
    let me ={};
    let intentMap = config || {};

    let getBestRatedIntent = function(intents){
        console.log("Precessando Intent:",intents);
        let intent = intents;//pode não ser um array;
        if(Array.isArray( intents )){
            intent = intents.reduce((ant,atual) => {return (ant.confidence > atual.confidence ? ant : atual)});
        }
        console.log("Best ranked Intent:",intent);
        return intent.intent;
    };

    me.resolve = function(intentArg){
        let intent = getBestRatedIntent(intentArg);
        return (intentMap[intent] || IntentMap['none'] || 'Descuple, não sei o que te responder. :(');
    };

    me.dictionarize = function(intentArg){
        let intent = getBestRatedIntent(intentArg);
        let ret = "{{"+(intent||'none')+"}}";
        console.log("Retornando termo:"+ret);
        return ret;
    };

    return me;
};

module.exports = SimpleIntentResolver;