const MongoClient = require('mongodb').MongoClient

class Dialog {
  static getAll(callback) {
    MongoClient.connect(process.env.LAIS_ADM_MONGO_DB_URL, function(err, db) {
      var collection = db.collection('Definicao_Dialogos');

      collection.find({}).toArray(callback);

      db.close();
    });
  }
}

module.exports = Dialog;
