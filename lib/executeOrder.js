'use strict';

/**
 * Execute Order
 * @param {object} headers
 * @param {string} accountId
 * @return {object} orders
 */

const request = require('superagent');
const endpoints = require('../util/endpoints');

module.exports = (headers, account_id, symbol, price, quantity) => {
    const endpoint = endpoints['executeOrder'](account_id);
    return request
        .post(`${endpoint}`)
        .set(headers)
        .send({
            "source": "WBT",
            "order-type": "Limit",
            "price": price,
            "price-effect": "Debit",
            "time-in-force": "Day",
            "legs": [{"instrument-type": "Equity Option",
                     "symbol": symbol,
                     "quantity": quantity,
                     "action": "Buy to Open"}]
        })
        .then(res => {
            const {
                body: {
                    data: {
                        order
                    }
                }
            } = res;

            return order;
        });
}
