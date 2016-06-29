'use strict';

const apn = require('apn');
const gcm = require('node-gcm');
const iosSender = require('./platforms/ios');
const androidSender = require('./platforms/android');

// If you plan on sending identical paylods to many devices you can do something like this.
const pushNotificationToMany = (body) => {
    console.log('Sending the same notification each of the devices with one call to pushNotification.');

    switch (body.platform) {
        case 'IOS':
            let note = new apn.notification();
            let tokens = [body.token];
            note.payload = {
                action: body.action,
                currentIdRestaurant: body.restaurantId
            };
            note.sound = 'ping.aiff';
            note.setAlertText(body.text);
            note.badge = 0;
            iosSender.pushNotification(note, tokens);
            break;
        case 'ANDROID':
            let message = new gcm.Message({
                data: {
                    message: body.text,
                    custom : {
                        action: body.action,
                        currentIdRestaurant: body.restaurantId
                    }
                },
                badge: body.badge
            });
            let regTokens = [body.token];

            androidSender.send(message, {registrationTokens: regTokens}, (err, response) => {
                if (err) console.error(err);
                else    console.log(response);
            });
            break;
    }
};

module.exports = pushNotificationToMany;