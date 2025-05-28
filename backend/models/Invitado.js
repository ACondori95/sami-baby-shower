const mongoose = require("mongoose");

const attendantSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    accepted: {type: Boolean, default: false},
  },
  {timestamps: true}
);

module.exports = mongoose.model("Invitado", attendantSchema);
