const monk = require('monk');

class Dialog {
  static getAll() {
    var db = monk(process.env.LAIS_ADM_MONGO_DB_URL);
    const dialogs = db.get('Definicao_Dialogos')
    return dialogs.find({})
  }
}

module.exports = Dialog;
