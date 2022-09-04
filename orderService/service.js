const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const axios = require('axios')
const db = require('./database')
const {OrderModel} = require('./models/OrderModel')
const mongoose = require('mongoose')
require('dotenv').config()
const port = 5001

app.use(cors())
app.use(bodyParser.json())
db.dbConnect()
app.post('/initiate-order', async (req, res) => {
    const Products = req.body
    const instance = await axios.post('http://127.0.0.1:9000/model/order_model.bpmn/instance')
    // console.log(Products, instance.data.id)
    // const newOrder = new OrderModel({
    //   InstanceId: instance.data.id,
    //   User: mongoose.Types.ObjectId('62a376f75af167109d5b303c'),
    //   Products: Products
    // })
    // const data = await newOrder.save()
    res.json(instance.data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})