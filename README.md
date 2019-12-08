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

### `MarketMetrics(ACCOUNT_ID, TICKERS)`

Fetch the metrics for a list of tickers

```js
TastyWorks.marketMetrics(['IRBT', 'TSLA']);
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
