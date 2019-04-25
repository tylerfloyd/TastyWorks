'use strict';

const TastyWorks = require('../lib/index');
const credentials = {
    username: process.env.TASTY_USERNAME,
    password: process.env.TASTY_PASSWORD
};

// Set the username and password
TastyWorks.setUser(credentials);

const args = process.argv.splice(2)
var symbol = buildSymbol(args[0])


// Before making any calls, get the session-token via the authorization endpoint
TastyWorks.authorization()
    .then(token => {
        // Set the authorization in the headers
        TastyWorks.setAuthorizationToken(token);
        console.log('Session is active, continue with other calls.' + token);
        return true;
    })
    .then(() => TastyWorks.executeOrder(process.env.TASTY_ACCOUNT_ID,symbol, 0.05, 1))
    .then(executed => {
        console.log('======= ORDER EXECUTED =======');
        console.log(executed)
    });

/**
 * 
 * @param {string} open 
 */
function buildSymbol(open) {

    var parsed = open.split(" ")

    var firstSpace = open.indexOf(" ")
    var lastSpace = open.lastIndexOf(" ")

    var wrkUnderlying = parsed[0]                     //open.substr(0,firstSpace)
                //  console.log(open.substr(firstSpace + 1))
    var wrkDate = new Date(Date.parse(parsed[1] + " " + parsed[2] + " " + parsed[3]))            
                    //new Date(Date.parse(open.substr(firstSpace + 1)))

    var optionType = parsed[4]
    var wrkStrike = parseFloat(parsed[5]).toFixed(3) //open.substr(lastSpace + 1) 
    var strike = wrkStrike.toString().replace(".", "").padStart(8,"0")

    var iso = wrkDate.toISOString()
    var yy = iso.substr(2,2)
    var mm = iso.substr(5,2)
    var dd = iso.substr(8,2)
    var expDate = yy + mm + dd

    var underlying = wrkUnderlying.padEnd(6," ")

    console.log(open)
    var builtSymbol = underlying + expDate + optionType + strike
    console.log(builtSymbol)

    return builtSymbol
}
