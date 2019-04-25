'use strict';

const TastyWorks = require('../lib/index');
const credentials = {
    username: process.env.TASTY_USERNAME,
    password: process.env.TASTY_PASSWORD
};

// Set the username and password
TastyWorks.setUser(credentials);

const args = process.argv.splice(2)

// Before making any calls, get the session-token via the authorization endpoint
TastyWorks.authorization()
    .then(token => {
        // Set the authorization in the headers
        TastyWorks.setAuthorizationToken(token);
        console.log('Session is active, continue with other calls.' + token);
        return true;
    })
    .then(() => TastyWorks.cancelOrder(process.env.TASTY_ACCOUNT_ID,args[0]))
    .then(executed => {
        console.log('======= ORDER CANCELED =======');
        console.log(executed)
    });
