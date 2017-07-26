const monk = require('monk');

class Rule {
  static getAll() {
    var db = monk(process.env.LAIS_ADM_MONGO_DB_URL);
    const rules = db.get('Definicao_Regras')
    return rules.find({})
  }
}

module.exports = Rule;
