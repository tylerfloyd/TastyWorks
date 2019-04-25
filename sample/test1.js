'use strict';

const TastyWorks = require('../lib/index');
const credentials = {
    username: process.env.TASTY_USERNAME,
    password: process.env.TASTY_PASSWORD
};

// Set the username and password
TastyWorks.setUser(credentials);

// Before making any calls, get the session-token via the authorization endpoint
TastyWorks.authorization()
    .then(token => {
        // Set the authorization in the headers
        TastyWorks.setAuthorizationToken(token);
        console.log('Session is active, continue with other calls.');
        return true;
    })
    .then(() => TastyWorks.accounts())
    .then(accounts => TastyWorks.setUser({
        accounts
    }))
    .then(() => {
        console.log('======= USER OBJECT =======');
        console.log(TastyWorks.getUser());
    })
    .then(() => TastyWorks.balances(process.env.TASTY_ACCOUNT_ID))
    .then(balances => {
        console.log('======= ACCOUNT BALANCES =======');
        console.log(balances)
    })
    .then(() => TastyWorks.positions(process.env.TASTY_ACCOUNT_ID))
    .then(positions => {
        console.log('======= ACCOUNT POSITIONS =======');
        console.log(positions)
    })
    .then(() => TastyWorks.liveOrders(process.env.TASTY_ACCOUNT_ID))
    .then(liveOrders => {
        console.log('======= ACCOUNT LIVEORDERS =======');
        console.log(liveOrders)
    })
	.then(() => TastyWorks.streamer())
    .then(streamer => {
        console.log('======= STREAMER =======');
        console.log(streamer)
    });
