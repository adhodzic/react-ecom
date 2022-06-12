//Require Mongoose
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  Name: {type: String, required: true, index: { unique: true}},
  OptionGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'OptionGroup'}
});

exports.OptionModel = mongoose.model('OptionModel', OptionSchema );