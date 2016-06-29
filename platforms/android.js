"use strict";

const gcm = require('node-gcm');
const androidConfig = require('../android.json');

module.exports = new gcm.Sender(androidConfig.key);