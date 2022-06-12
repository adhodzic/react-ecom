//Require Mongoose
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const ItemGroupSchema = new Schema({
  Name: {type: String, required: true, index: { unique: true}},
  Description: {type: String, required: true},
  User: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
});

exports.ItemGroupModel = mongoose.model('ItemGroupModel', ItemGroupSchema );