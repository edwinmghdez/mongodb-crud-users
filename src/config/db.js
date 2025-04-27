const mongoose = require("mongoose");
require("dotenv").config();

// Connect to db
module.exports.connect = async () => {
  await mongoose
    .connect(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=admin`
    )
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Error connecting DB:", err));
};

// Close connection
module.exports.close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

// Remove all data from db
module.exports.clear = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
