//Require Mongoose
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const ItemDataSchema = new Schema({
  Value: {type: String, required: true},
  Item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true}
});

exports.ItemDataModel = mongoose.model('ItemDataModel', ItemDataSchema );