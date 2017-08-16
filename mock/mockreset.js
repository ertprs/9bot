const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const chalk = require("chalk");


let sendError = function (res,msg,err) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500)
        .send({'status': 500, 'message':msg, 'err':err});
};

let curryCallback = function({callbackUrl,callbackData}){
    return ()=>{
        console.log("Executou o callback!!!!");
        try{
            console.log(chalk.blue.bgWhite('posting callback to >> '+callbackUrl));
            let message = Math.random().toString(36).substring(7);
            let cpf = Math.random().toString(36).substring(11);
            let dataNascimento = new Date(+(new Date()) - Math.floor(Math.random()*10000000000));
            let postData = {"requestData":callbackData, message, cpf, dataNascimento};
            fetch(callbackUrl,
                {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(postData)
            })
                .then(()=>console.log(chalk.underline.blue.bgWhite('callback fetch done!')))
                .catch((e)=>{console.error(chalk.blueRed.bgWhite('callback fetch error!'));console.error(e)});
        }catch(e){console.error("unexpected error on callback",e)}
    }
};

let handlepost = function(req, res){
    console.log("post recebido...");
    let {callbackUrl, callbackData, timeout} = req.body;

    timeout = (timeout || 5)*1000;//seconds to ms

    if(!callbackUrl){
        return sendError(res,"callback url not defined");
    }

    console.log("registrando callback em: "+timeout+"ms");
    setTimeout(curryCallback({callbackUrl, callbackData}),timeout);

    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send({status: 200, message:"Reset registrado com sucesso"});
    console.log("post retornado.");
};

module.exports = [bodyParser.json(),handlepost];