const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  value: { type: String, required: true, unique: true },
});

module.exports = model("CertAccess", schema);
