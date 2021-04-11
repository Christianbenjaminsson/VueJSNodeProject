const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
