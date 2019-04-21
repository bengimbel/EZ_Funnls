const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resturantSchema = new Schema({
  name: String,
  address: String,
  rating: Number,
  location: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model("Resturant", resturantSchema);