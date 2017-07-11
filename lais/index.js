let _client = require('./Client');
let _dictionary = require('./Dictionary');
let _DialogFlowResolver = require('./DialogFlowResolver');
let laisDialog = require('./lais-dialog');
module.exports = {
    "Client":_client.Client,
    "Dictionary": _dictionary.Dictionary,
    "DialogFlowResolver":_DialogFlowResolver,
    laisDialog
};
