let _client = require('./Client');
let _dictionary = require('./Dictionary');
let _SimpleIntentResolver = require('./SimpleIntentResolver');
let _DialogFlowResolver = require('./DialogFlowResolver');
module.exports = {
    "Client":_client.Client,
    "Dictionary": _dictionary.Dictionary,
    "SimpleIntentResolver":_SimpleIntentResolver,
    "DialogFlowResolver":_DialogFlowResolver
};
