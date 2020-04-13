'use strict';

const TastyWorks = require('../lib/index');
const credentials = {
    username: process.env.TASTY_USERNAME,
    password: process.env.TASTY_PASSWORD
};

let TASTY_ACCOUNT_ID;

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
    .catch(err => console.log(err.status))
    .then(accounts => {
        TASTY_ACCOUNT_ID = accounts[0]['account-number'];
        TastyWorks.setUser({accounts});
    })
    .then(() => {
        console.log('======= USER OBJECT =======');
        console.log(TastyWorks.getUser());
    })
    .then(() => TastyWorks.balances(TASTY_ACCOUNT_ID))
    .catch(err => console.log(err.status))
    .then(balances => {
        console.log('======= ACCOUNT BALANCES =======');
        console.log(balances)
    })
    .then(() => TastyWorks.positions(TASTY_ACCOUNT_ID))
    .catch(err => console.log(err.status))
    .then(positions => {
        console.log('======= ACCOUNT POSITIONS =======');
        console.log(positions)
    })
    .then(() => TastyWorks.liveOrders(TASTY_ACCOUNT_ID))
    .catch(err => console.log(err.status))
    .then(liveOrders => {
        console.log('======= ACCOUNT LIVEORDERS =======');
        console.log(liveOrders)
    })
    .then(() => TastyWorks.history(TASTY_ACCOUNT_ID, '01/01/2019', '01/05/2019'))
    .catch(err => console.log(err.status))
    .then(history => {
        console.log('======= ACCOUNT HISTORY =======');
        console.log(history)
    })
    .then(() => TastyWorks.marketMetrics(['AMZN', 'SPX']))
    .then(marketData => {
        console.log('======= Market Data =======');
        console.log(marketData)
    })
    .then(() => TastyWorks.optionChain('TSLA'))
    .then(chain => {
        console.log('======= Option chain =======');
        console.log(chain)
        console.table(chain.items[0].expirations)
    })

