'use strict';

/**
 * Get Account Orders
 * @param {object} headers
 * @param {string} accountId
 * @return {object} orders
 */

const request = require('superagent');
const endpoints = require('../util/endpoints');

module.exports = (headers, account_id) => {
    const endpoint = endpoints['liveOrders'](account_id);
    return request
        .get(`${endpoint}`)
        .set(headers)
        .send()
        .then(res => {
            const {
                body: {
                    data: {
                        items
                    }
                }
            } = res;

            return items;
        });
}
