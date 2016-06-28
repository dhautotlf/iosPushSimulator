"use strict";

var apn = require("apn");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));

var options = {
    key: 'cert.pkey',
    cert: 'key.pem',
    production: true
};

var service = new apn.connection(options);

app.post('/notification', function(req, res) {
    var body = req.body;

    if (!body.action || !body.text || !body.restaurantId || !body.badge || !body.token) {
        return res.status(400).send('One of the parameter is missing');
    }
    pushNotificationToMany(body);
    res.status(200).send("Notification SENT !");
});

service.on("connected", function() {
    console.log("Connected");
});

service.on("transmitted", function(notification, device) {
    console.log("Notification transmitted to:" + device.token.toString("hex"));
});

service.on("transmissionError", function(errCode, notification, device) {
    console.error("Notification caused error: " + errCode + " for device ", device, notification);
    if (errCode === 8) {
        console.log("A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox");
    }
});

service.on("timeout", function() {
    console.log("Connection Timeout");
});

service.on("disconnected", function() {
    console.log("Disconnected from APNS");
});

service.on("socketError", console.error);

// If you plan on sending identical paylods to many devices you can do something like this.
function pushNotificationToMany(body) {
    console.log("Sending the same notification each of the devices with one call to pushNotification.");

    var note = new apn.notification();
    var tokens = [body.token];
    note.payload = {
        action: body.action,
        currentIdRestaurant: body.restaurantId
    };
    note.setAlertText(body.text);
    note.badge = body.badge;
    service.pushNotification(note, tokens);
}

app.listen(3001);