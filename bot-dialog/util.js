const mime = require('mime-types');
const _ = require('lodash');
const mb = require('../messageBuilder');
const fs = require('fs');
const path = require('path');
const nodeUtil = require('util');

let uuid = function () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
let walkSync = function (dir) {
    if (!fs.lstatSync(dir).isDirectory()) return dir;
    return fs.readdirSync(dir).map(f => walkSync(path.join(dir, f))); // `join("\n")`
};

let getUserName = function (ctx) {
    return ctx;
};

let clearContext = function (ctx) {
    let internal = ctx.__;
    let persistent = ctx.persistent;
    let newContext = {};
    newContext.__ = internal;
    newContext.persistent = persistent;
    if (newContext.__) newContext.__.listenOnly = ["intent", "entities"];
    return newContext;
};

// console.log("WALK_SYNC::",walkSync());

/**
 *  Build media library
 */
const MEDIA_LIB = {};
const MEDIA_FOLDER = path.resolve(__dirname, './media');
const DOT_REPLACE = "-";
(function (dir) {
    let fileList = walkSync(dir);
    fileList.forEach((f) => {
        let data = fs.readFileSync(f);

        let base64 = Buffer.from(data).toString('base64');
        let contentType = mime.lookup(f);
        let filename = path.basename(f);
        MEDIA_LIB[filename.replace('\.',DOT_REPLACE)]={
            "type": "media",
            "content": {
                "contentType": contentType,
                "contentUrl": nodeUtil.format('data:%s;base64,%s', contentType, base64),
                "name": path.basename(f)
            }
        }
    });

})(MEDIA_FOLDER);


/**
 *
 * @param filename
 * @returns {*}
 */
let replyStaticMedia = function (filename) {
    let prop = filename.replace('\.',DOT_REPLACE);
    return MEDIA_LIB[prop];
};

/**
 *
 * @param url
 * @param contentType
 * @param name
 * @returns {{type: string, content: {contentType: (*|boolean|string), contentUrl: *, name: (*|string)}}}
 */
let replyMedia = function (url, contentType, name) {
    if (!url) throw new Error("Invalid reply media url. Cannot be null");
    contentType = contentType || mime.lookup(url);
    name = name || uuid() + "." + mime.extension(contentType);

    return {
        "type": "media",
        "content": {
            "contentType": contentType,
            "contentUrl": url,
            "name": name
        }
    }
};

/**
 *
 * @param title
 * @param choices
 * @returns {{type: string, meta: {title: *, subtitle: *, text: *}, content: Array}}
 */
let replyChoices = function (title, choices) {
    let arrTitle = title.split('|');
    let arrChoices = [];
    if (typeof choices === 'string') {
        arrChoices = choices.split("|")
    } else if (_.isArray(arrChoices)) {
        arrChoices = choices;
    } else {
        throw new Error("Invalid choices parameter. Expected String or Array.")
    }

    let arrChoicesObj = arrChoices.map((c) => {
        let arrTextValue = c.split("|");
        let text = arrTextValue[0] || "undefined";
        let val = arrTextValue[1] || text;
        return {"text": text, "value": val};
    });

    return {
        "type": "choice",
        "meta": {"title": arrTitle[0], "subtitle": arrTitle[1], "text": arrTitle[2]},
        "content": arrChoicesObj
    };
};
/**
 * exemplos:
 *
 * util.replyChoices("Título|Subtitulo|Text","Sim|Não|Quem Sabe"),
 * util.replyMedia("https://www.blogdainformatica.com.br/wp-content/uploads/2015/12/giphy.gif"),
 * util.replyStaticMedia("lais.png")
 * @type {{getUserName: getUserName, clearContext: clearContext, replyChoices: replyChoices, replyMedia: replyMedia, replyStaticMedia: replyStaticMedia, buildClearContextAndDefine: module.exports.buildClearContextAndDefine}}
 */


module.exports = {
    getUserName,
    clearContext,
    replyChoices,
    replyMedia,
    replyStaticMedia,
    buildClearContextAndDefine: function (newContext) {
        return function (ctx) {
            let ctxZerado = fnClearContext(ctx);
            return _.merge(ctxZerado, newContext);
        };
    }
};