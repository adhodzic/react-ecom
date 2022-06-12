//Require Mongoose
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  Name: {type: String, required: true},
  ItemGroup: {type: mongoose.Types.ObjectId, ref: 'ItemGroup', required: true}
});

exports.ItemModel = mongoose.model('ItemModel', ItemSchema );