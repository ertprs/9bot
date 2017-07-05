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
    return me;
};
module.exports = RTCompiler;