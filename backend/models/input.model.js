const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inputSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageFile: { type: String, required: true }
}, {
  timestamps: true,
});

const Input = mongoose.model('Input', inputSchema);

module.exports = Input;