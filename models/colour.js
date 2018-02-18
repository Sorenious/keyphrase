const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colourSchema = new Schema({
  start: { type: Array, required: true }
});

const Colour = mongoose.model("Colour", colourSchema);

module.exports = Colour;
