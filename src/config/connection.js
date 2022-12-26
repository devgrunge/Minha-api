const mongoose = require("mongoose");

class connection {
  constructor() {
    this.databaseConnectionMongoDB();
  }

  databaseConnectionMongoDB() {
    this.mongoDBconnection = mongoose
      .connect("mongodb://127.0.0.1:27017/nodejs", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Conexão com mongoDB estabelecida com sucesso");
      })
      .catch((error) => {
        console.log(`Erro ao estabelecer conexão com o MongoDb: ${error}`);
      });
  }
}

module.exports = new connection();
