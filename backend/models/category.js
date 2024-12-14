const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamp: true } // the timestamp automatically adds created and updated date time stamps to the database
);

module.exports = mongoose.model("Category", categorySchema);
