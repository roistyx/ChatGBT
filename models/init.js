const { MongoClient } = require("mongodb");
// const CatalogDAO = require("./CatalogDAO");
const StockNewsDAO = require("./StockNewsDAO");

module.exports.InitDB = async function initDB() {
  MongoClient.connect(process.env.MONGODB_URI)

    .then(async (connection) => {
      await StockNewsDAO.injectDB(connection.db(process.env.DB));
    })
    .catch((err) => {
      console.log("error connecting to MongoDB:", err);
      process.exit(1);
    });
};
