const fetch = require('node-fetch');
const fetchUtils = require('./fetchUtils');

const laisClient = function (initArgs) {
    let endPointUrl = process.env.LAIS_END_POINT;
    let connectorId = process.env.LAIS_CONNECTOR;
    let me = {};

    /*
     *   Retorna uma promisse com o resultado da chamada
     */
    me.talk = function talk(userId, message) {
        return fetch(endPointUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'AppName': process.env.APP_NAME,
                'Authorization': process.env.LASA_CORE_AUTHORIZATION
            },
            body: JSON.stringify({
                'connectorId':connectorId,
                'contextId': userId,
                'userId': userId,
                'inputText': message.toString(),
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
