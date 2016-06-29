'use strict';

const apn = require('apn');
const gcm = require('node-gcm');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(express.static('public'));

routes(app);

app.listen(3001);