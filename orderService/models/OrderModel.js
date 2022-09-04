//Require Mongoose
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  InstanceId: {type: String, required: true},
  User: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  Products: {type: Array},
  Status: {type: String, default:'started', required: true}
});

exports.OrderModel = mongoose.model('OrderModel', OrderSchema );