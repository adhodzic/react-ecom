//Require Mongoose
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const ItemFieldSchema = new Schema({
  Name: {type: String, required: true, index: { unique: true}},
  Description: {type: String, required: true},
  DataType: {type: String, required: true},
  ItemGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'ItemGroup', required: true}
});

exports.ItemFieldModel = mongoose.model('ItemFieldModel', ItemFieldSchema );