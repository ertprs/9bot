const _ = require("lodash");
const vm = require('vm');
const util = require('util');
const RTCompiler = function(args){
    const sandbox = vm.createContext(_.merge(args,{module:{exports:null}}));
    const me = {};
    me.require = function(code) {
        sandbox.module.exports = null;
        vm.runInNewContext(code,sandbox);
        return sandbox.module.exports;
    };
    me.compileAttributes = (obj,...attrs)=>{
        attrs.forEach((attr)=>{
            let attrVal = obj[attr];
            if(!attrVal) return;
            if(!(typeof attrVal === "string")) throw new Error(`Cannot compile attribute ${attr}. Only strings allowed`);
            let code = `module.exports = ${attrVal}`;
            obj[attr] = me.require(code);
        })
    };
    return me;
};
module.exports = RTCompiler;