const util = require('util');
const _ = require('lodash');
const moment = require('moment');
const {get,add,clear,clearAll} = require('./_extra/lais-conversation-definition/rules/util');
const RTCompiler = require('./RTCompiler')({get,add,clear,clearAll, util, _, moment});

const laisConv = require('./_extra/lais-conversation-definition/joinedRules_sample');

let compileAttrs = (obj,...attrs)=>{
    attrs.forEach((attr)=>{
        let attrVal = obj[attr];
        if(!attrVal) return;
        if(!(typeof attrVal === "string")) throw new Error(`Cannot compile attribute ${attr}. Only strings allowed`);
        let code = `module.exports = ${attrVal}`;
        obj[attr] = RTCompiler.require(code);
    })
};

let compileFunctions = (conv)=>{
    conv.rules = conv.rules.map((r)=>{
        console.log("compiling rule: "+r.id+" ...");
        compileAttrs(r,"match");

        r.actions.forEach((a,i)=>{
            console.log("compiling action: "+r.id+".actions["+i+"] ...");
            compileAttrs(a,"match"/*,"goToDialog"*/);//não tem como saber se o goToDialog é uma string com o id do dialogo ou uma string com uma função;
        });
        return r;
    });
};



console.log('------------------- Compiling rules ------------------');
compileFunctions(laisConv);


// laisConv.rules.forEach((r)=>{
//     let matchString = r.match || "()=>true";
//     let code = `module.exports = ${matchString}`;
//     console.log("compiling "+r.id+"...");
//     let func = RTCompiler.require(code);
//     console.log("running...");
//     func({});
//     console.log("done!");
// });

console.log('########################################################');