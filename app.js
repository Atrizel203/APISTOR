require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { databaseService } = require('./databaseService');

const app = express();

app.use(bodyParser.json());

// Middleware de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
require('./routes')(app, databaseService());

app.listen(3003, () => {
  console.log('App listening on port http://localhost:3003');
});