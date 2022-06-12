const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const database = require("./services/database");
require('dotenv').config()

const jwt = require('jsonwebtoken')
const userRouter = require('./routes/user.routes.js')
const commonRouter = require('./routes/common.routes.js')
const itemRouter = require('./routes/item.routes.js')

const app = express();

app.use(cors())
database.dbConnect()
app.use(bodyParser.json())
app.use('/api',[userRouter, commonRouter,itemRouter])

const port = process.env.PORT || 5000

app.listen(port, ()=>{console.log("Server is open on port 5000")});