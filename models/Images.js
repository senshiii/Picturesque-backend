const mongoose = require("mongoose");

const imgSchema = mongoose.Schema(
  {
    dataUrl: {
      type: String,
    },
<<<<<<< HEAD
    src: {
      type: String,
    },
    name: {
      type: String
    },
=======
    shortUrl: {
      type: String,
    },
>>>>>>> 38c46747fd785cc93ebe81a2762e733ca08cf88d
    access: {
      type: String,
      default: "public",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    size:{
      type: Number,
      default: 0
    },
    tags: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Image", imgSchema);
