'use strict';
const apn = require('apn');

const options = {
    key: 'cert.pkey',
    cert: 'key.pem',
    production: true
};

let service = new apn.connection(options);
/**
 *  IOS INITIALIZATION
 */
service.on('connected', () => {
    console.log('Connected');
});

service.on('transmitted', (notification, device) => {
    console.log('Notification transmitted to:' + device.token.toString('hex'));
});

service.on('transmissionError', (errCode, notification, device) => {
    console.error('Notification caused error: ' + errCode + ' for device ', device, notification);
    if (errCode === 8) {
        console.log('A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox');
    }
});

service.on('timeout', () => {
    console.log('Connection Timeout');
});

service.on('disconnected', () => {
    console.log('Disconnected from APNS');
});

service.on('socketError', console.error);

module.exports = service;