'use strict';
const pushNotificationToMany = require('./sender');

let platforms = ['IOS', 'ANDROID'];
module.exports = (app) => {
    /**
     * Post a new notification route
     */
    app.post('/notification', (req, res) => {
        let body = req.body;

        if (!body.platform || !body.action || !body.text || !body.restaurantId || !body.badge || !body.token) {
            return res.status(400).send('One of the parameters is missing');
        }
        pushNotificationToMany(body);
        res.status(200).send('Notification SENT !');
    });

    /**
     * Get all available platforms
     */
    app.get('/platforms', (req, res) => {
        res.status(200).send(platforms);
    });
};