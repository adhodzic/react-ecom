//Require Mongoose
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const OptionGroupSchema = new Schema({
  Name: {type: String, required: true, index: { unique: true}}
});

exports.OptionGroupModel = mongoose.model('OptionGroupModel', OptionGroupSchema );