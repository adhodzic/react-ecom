const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const database = require("./services/database");
require('dotenv').config()

const https = require('https');
const fs = require('fs');

const jwt = require('jsonwebtoken')
const userRouter = require('./routes/user.routes.js')
const commonRouter = require('./routes/common.routes.js')
const itemRouter = require('./routes/item.routes.js')

var key = fs.readFileSync(__dirname + '/certs/selfsigned.key', 'utf8');
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt', 'utf8');
var options = {
  key: key,
  cert: cert
};

const app = express();


app.use(cors())
database.dbConnect()
app.use(bodyParser.json())
app.use('/api',[userRouter, commonRouter,itemRouter])

var server = https.createServer(options, app);

const port = process.env.PORT || 5000

server.listen(port, ()=>{console.log("Server is open on port 5000")});