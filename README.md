# Tastyworks Node API
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftylerfloyd%2FTastyWorks.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftylerfloyd%2FTastyWorks?ref=badge_shield)


[![npm](https://img.shields.io/npm/v/tasty-works-api.svg?style=flat-square)](https://www.npmjs.com/package/tasty-works-api)
[![David](https://img.shields.io/david/tylerfloyd/tastyworks.svg?style=flat-square)](https://david-dm.org/tylerfloyd/tastyworks)
[![npm](https://img.shields.io/npm/dm/tasty-works-api.svg)](https://www.npmjs.com/package/tasty-works-api)

NodeJS Framework for basic account information, balances, positions and orders with [TastyWorks's](https://www.tastyworks.com/) private API. This API has been reversed engineered. The stability and accuracy of this API cannot be garunteed.

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#gettingStarted)
- [API](#API)
  - [`User`](#user)
  - [`Authorization`](#authorization)
  - [`Accounts`](#accounts)
  - [`Balance`](#balances)
  - [`Positions`](#positions)
  - [`LiveOrders`](#liveorders)
  - [`History`](#history)
- [TODOs](#todos)

## Features

- Account Balances
- Account History
- Current Orders
- Current Positions

## Installation

```bash
$ npm install tasty-works-api --save
```

## Getting Started

`/sample/index.js` has an example of each call configured. To run and see each response, replace `YOUR_USERNAME` and `YOUR_PASSWORD` and `ACCOUNT_ID` with your Tastyworks credentials. Then run
```bash
$ cd sample && node index.js
```
in your Terminal.

## Local Build
Edit `package.json` with new version.
```bash
npm pack
npm install tasty-works-api-0.1.x.tgz
```

## API

### `User`

Set account variables after authentication is complete so the variables can be used later. The object has four keys, `username`, `password`, `authorization_token` and `accounts`. By deafult, you are only required to set the `username` and `password`. In order to make sure the proper credentials are set as well as, to view the associated account(s) with the user, the `getUser()` function is provided.

> **NOTE:** you must set the user object's `username` and `password` before other endpoints will work

```js
const TastyWorks = require('tasty-works-api');
const credentials = {
	username: 'username',
	password: 'password'
};

TastyWorks.setUser(credentials);
console.log(TastyWorks.getUser());
```

### `Authorization()`

The authorization endpoint will return a session token that needs to be set into headers that are used in subsequent calls. Also, this call assumes that you have previously set the `username` and `password` in the users object.

```js
TastyWorks.authorization().then(token => {
	// REQUIRED: Apply the new session token to the headers object passed into each call
	TastyWorks.setAuthorizationToken(token);

	// OPTIONAL: Set the session token in the user object
	TastyWorks.setUser({
		authorization_token: token
	});
	return true;
});
```

### `Accounts()`

Get all accounts associated with the logged in user. The response is an array of account objects. While it is easy to add these to the user object to be referenced when needed. You can hardcode the account that you wish to reference and pass that into the other calls, too.

```js
TastyWorks.accounts().then(accounts =>
	TastyWorks.setUser({
		accounts
	})
);
```

### `Balances(ACCOUNT_ID)`

Fetch the balances for a single account

```js
TastyWorks.balances('ACCOUNT_ID').then(balances => console.log(balances));
```

### `Positions(ACCOUNT_ID)`

Fetch the current positions for a single account

```js
TastyWorks.positions('ACCOUNT_ID').then(positions => console.log(positions));
```

### `LiveOrders(ACCOUNT_ID)`

Fetch the current (non-complete) orders for a single account. This can include orders that have been partially fulfilled

```js
TastyWorks.liveOrders('ACCOUNT_ID').then(liveOrders => console.log(liveOrders));
```

### `History(ACCOUNT_ID, START_DATE, END_DATE)`

Fetch the accounts order history for a given time period. Date format is `yyyy-mm-dd`.

```js
TastyWorks.history('ACCOUNT_ID', '2018-01-01', '2018-01-05').then(history => console.log(history));
```

### `MarketMetrics(TICKERS)`

Fetch the metrics for a list of tickers

```js
TastyWorks.marketMetrics(['IRBT', 'TSLA']);
```

### `OptionChain(TICKER)`

Fetch the option chain for a ticker

```js
TastyWorks.optionChain(['TEAM']);
```

```
┌─────────┬─────────────────┬─────────────────┬────────────────────┬─────────────────┬──────────────────────────────────────────────────────┐
│ (index) │ expiration-type │ expiration-date │ days-to-expiration │ settlement-type │                       strikes                        │
├─────────┼─────────────────┼─────────────────┼────────────────────┼─────────────────┼──────────────────────────────────────────────────────┤
│    0    │    'Regular'    │  '2020-04-17'   │         5          │      'PM'       │ [ [Object], [Object], [Object], ... 254 more items ] │
│    1    │    'Weekly'     │  '2020-04-24'   │         12         │      'PM'       │ [ [Object], [Object], [Object], ... 136 more items ] │
│    2    │    'Weekly'     │  '2020-05-01'   │         19         │      'PM'       │ [ [Object], [Object], [Object], ... 81 more items ]  │
│    3    │    'Weekly'     │  '2020-05-08'   │         26         │      'PM'       │ [ [Object], [Object], [Object], ... 41 more items ]  │
│    4    │    'Regular'    │  '2020-05-15'   │         33         │      'PM'       │ [ [Object], [Object], [Object], ... 226 more items ] │
│    5    │    'Weekly'     │  '2020-05-22'   │         40         │      'PM'       │ [ [Object], [Object], [Object], ... 41 more items ]  │
│    6    │    'Weekly'     │  '2020-05-29'   │         47         │      'PM'       │ [ [Object], [Object], [Object], ... 26 more items ]  │
│    7    │    'Regular'    │  '2020-06-19'   │         68         │      'PM'       │ [ [Object], [Object], [Object], ... 249 more items ] │
│    8    │    'Regular'    │  '2020-07-17'   │         96         │      'PM'       │ [ [Object], [Object], [Object], ... 210 more items ] │
│    9    │    'Regular'    │  '2020-08-21'   │        131         │      'PM'       │ [ [Object], [Object], [Object], ... 228 more items ] │
│   10    │    'Regular'    │  '2020-09-18'   │        159         │      'PM'       │ [ [Object], [Object], [Object], ... 251 more items ] │
│   11    │    'Regular'    │  '2020-10-16'   │        187         │      'PM'       │ [ [Object], [Object], [Object], ... 253 more items ] │
│   12    │    'Regular'    │  '2020-11-20'   │        222         │      'PM'       │ [ [Object], [Object], [Object], ... 93 more items ]  │
│   13    │    'Regular'    │  '2020-12-18'   │        250         │      'PM'       │ [ [Object], [Object], [Object], ... 88 more items ]  │
│   14    │    'Regular'    │  '2021-01-15'   │        278         │      'PM'       │ [ [Object], [Object], [Object], ... 254 more items ] │
│   15    │    'Regular'    │  '2021-03-19'   │        341         │      'PM'       │ [ [Object], [Object], [Object], ... 210 more items ] │
│   16    │    'Regular'    │  '2021-06-18'   │        432         │      'PM'       │ [ [Object], [Object], [Object], ... 196 more items ] │
│   17    │    'Regular'    │  '2021-09-17'   │        523         │      'PM'       │ [ [Object], [Object], [Object], ... 185 more items ] │
│   18    │    'Regular'    │  '2022-01-21'   │        649         │      'PM'       │ [ [Object], [Object], [Object], ... 213 more items ] │
│   19    │    'Regular'    │  '2022-03-18'   │        705         │      'PM'       │ [ [Object], [Object], [Object], ... 108 more items ] │
│   20    │    'Regular'    │  '2022-06-17'   │        796         │      'PM'       │ [ [Object], [Object], [Object], ... 148 more items ] │
└─────────┴─────────────────┴─────────────────┴────────────────────┴─────────────────┴──────────────────────────────────────────────────────┘
```

## TODOs

- Position groupings
- Fetch news for an equity
- Current option prices

## Direct Dependencies

| Library                               | Licenses |
| ------------------------------------- | -------- |
| **[superagent (4.1.0)](#superagent)** | MIT      |

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftylerfloyd%2FTastyWorks.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftylerfloyd%2FTastyWorks?ref=badge_large)
