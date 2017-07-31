const fetch = require('node-fetch');

class Rule {
  static getAll() {
    return fetch(process.env.LAIS_ADM_GET_RULES_URL, {
      method: "GET",
      headers: { "Authorization": process.env.LAIS_ADM_TOKEN }
      }).then((response) => {
        return response.json();
      });
  }
}

module.exports = Rule;
