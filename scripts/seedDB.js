const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Colours collection and inserts the colours below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/gameboard",
  {
    useMongoClient: true
  }
);

const colourSeed = [
  {
    "start" : [ 
        "#CC0000", 
        "#CC0000", 
        "#CC0000", 
        "#CC0000", 
        "#CC0000", 
        "#CC0000", 
        "#0000CC", 
        "#0000CC", 
        "#0000CC", 
        "#0000CC", 
        "#0000CC", 
        "#ECE15B", 
        "#ECE15B", 
        "#ECE15B", 
        "#ECE15B", 
        "#ECE15B"
    ]
  },
  {
    "start" : [ 
        "#0000CC", 
        "#CC0000", 
        "#CC0000", 
        "#CC0000", 
        "#CC0000", 
        "#CC0000", 
        "#0000CC", 
        "#0000CC", 
        "#0000CC", 
        "#0000CC", 
        "#0000CC", 
        "#ECE15B", 
        "#ECE15B", 
        "#ECE15B", 
        "#ECE15B", 
        "#ECE15B"
    ]
  }
];

db.Colour
  .remove({})
  .then(() => db.Colour.collection.insertMany(colourSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
