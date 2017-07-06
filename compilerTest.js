const util = require('util');
const _ = require('lodash');
const moment = require('moment');
const {get,add,clear,clearAll} = require('./_extra/lais-conversation-definition/rules/util');
const RTCompiler = require('./RTCompiler')({get,add,clear,clearAll, util, _, moment});

const laisConv = require('./_extra/lais-conversation-definition/joinedRules_sample');

let compileFunctions = (conv)=>{
    conv.rules = conv.rules.map((r)=>{
        console.log("compiling rule: "+r.id+" ...");
        RTCompiler.compileAttributes(r,"match");

        r.actions.forEach((a,i)=>{
            console.log("compiling action: "+r.id+".actions["+i+"] ...");
            RTCompiler.compileAttributes(a,"match"/*,"goToDialog"*/);//não tem como saber se o goToDialog é uma string com o id do dialogo ou uma string com uma função;
        });
        return r;
    });
};

console.log('------------------- Compiling rules ------------------');
compileFunctions(laisConv);
console.log('########################################################');