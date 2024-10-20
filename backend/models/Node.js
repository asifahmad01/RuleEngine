const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  nodeType: { type: String, required: true }, // "operator", "operand", or "condition"
  left: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' }, // Left child for operators
  right: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' }, // Right child for operators
  value: { type: mongoose.Schema.Types.Mixed }, // Store "AND", "OR", or condition values
  operator: { type: String }, // Comparison operators like ">", "<", "=="
});

module.exports = mongoose.model('Node', nodeSchema);
