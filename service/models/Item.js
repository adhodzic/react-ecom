//Require Mongoose
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  Name: {type: String, required: true, index: { unique: true}},
  Description: {type: String, required: true},
  ItemGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'ItemGroup'}
});

exports.ItemModel = mongoose.model('ItemModel', ItemSchema );