//Require Mongoose
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const ItemDataSchema = new Schema({
  Value: {type: String},
  Option: {type: mongoose.Schema.Types.ObjectId, ref: 'Option'},
  ItemField: {type: mongoose.Schema.Types.ObjectId, ref: 'ItemField', required: true},
  Item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true}
});

exports.ItemDataModel = mongoose.model('ItemDataModel', ItemDataSchema );