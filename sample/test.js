
'use strict';

const TastyWorks = require('../lib/index');

const args = process.argv.splice(2)
var open = args[0] + ""

buildSymbol(open)


function buildSymbol(open) {
    // const args = process.argv.splice(2)
    // var open = args[0]

    var parsed = open.split(" ")

    var firstSpace = open.indexOf(" ")
    var lastSpace = open.lastIndexOf(" ")

    var wrkUnderlying = parsed[0]                     //open.substr(0,firstSpace)
                //  console.log(open.substr(firstSpace + 1))
    let wrkDate = new Date(Date.parse(parsed[1] + " " + parsed[2] + " " + parsed[3]))            
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