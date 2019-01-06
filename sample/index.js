'use strict';

const TastyWorks = require('../lib/index');
const credentials = {
    username: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD'
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
    .then(() => TastyWorks.balances('ACCOUNT_ID'))
    .then(balances => {
        console.log('======= ACCOUNT BALANCES =======');
        console.log(balances)
    })
    .then(() => TastyWorks.positions('ACCOUNT_ID'))
    .then(positions => {
        console.log('======= ACCOUNT POSITIONS =======');
        console.log(positions)
    })
    .then(() => TastyWorks.liveOrders('ACCOUNT_ID'))
    .then(liveOrders => {
        console.log('======= ACCOUNT LIVEORDERS =======');
        console.log(liveOrders)
    })
    .then(() => TastyWorks.history('ACCOUNT_ID', '01/01/2019', '01/05/2019'))
    .then(history => {
        console.log('======= ACCOUNT HISTORY =======');
        console.log(history)
    });
