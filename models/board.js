const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  layout: { type: Array, required: true },
  colourScheme: { type: Array, required: true },
  cover: { type: Array, required: true },
  turn: { type: String, required: true },
  size: { type: String, required: true },
  red: { type: Number, required: true },
  blue: { type: Number, required: true },
  over: { type: Boolean, required: true }
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
