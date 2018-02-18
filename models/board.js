const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  layout: { type: Array, required: true },
  colourScheme: { type: Array, required: true }
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
