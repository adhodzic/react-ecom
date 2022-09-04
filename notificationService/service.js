const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const port = 5001
app.use(cors())
app.use(bodyParser.json())

app.post('/notify-user', (req, res) => {
    const Products = req.body
    console.log(Products)
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})