const mongoose = require("mongoose");

const imgSchema = mongoose.Schema(
  {
    dataUrl: {
      type: String,
    },
    src: {
      type: String,
    },
    name: {
      type: String
    },
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
