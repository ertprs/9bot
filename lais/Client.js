const fetch = require('node-fetch');
const fetchUtils = require('./fetchUtils');

const laisClient = function (initArgs) {
    let endPointUrl = process.env.LAIS_END_POINT;
    let connectorId = process.env.LAIS_CONNECTOR;
    let me = {};

    /*
     *   Retorna uma promisse com o resultado da chamada
     */
    me.talk = function talk(message) {
        return fetch(endPointUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'inputText':message.toString(),
                'connectorId':connectorId
            })
        }).then(fetchUtils.handleEnvelope);
    };

    let init = function init(){
        loadArgs();
    };

    let loadArgs = function loadArgs(){
        initArgs = initArgs ||{};
        endPointUrl = initArgs.url || endPointUrl;
        connectorId = initArgs.connector || connectorId;

        if(!endPointUrl){
            throw new Error("Não foi possível determinar o valor para url. Por favor verifique a variável de ambiente LAIS_END_POINT ou os parâmetros passados para o cliente.");
        }
        if(!connectorId){
            throw new Error("Não foi possível determinar o valor para url. Por favor verifique a variável de ambiente LAIS_CONNECTOR ou os parâmetros passados para o cliente.");
        }
    };

    init();
    return me;
};

module.exports = {
    'Client':laisClient
};