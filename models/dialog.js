const fetch = require('node-fetch');

class Dialog {
  static getAll() {
    return fetch(process.env.LAIS_ADM_GET_DIALOGS_URL, {
      method: "GET",
      headers: { "Authorization": process.env.LAIS_ADM_TOKEN }
      }).then((response) => {
        return response.json();
      });
  }
}

module.exports = Dialog;
