'use strict';

/**
 * Execute Order
 * @param {object} headers
 * @param {string} accountId
 * @param {string} orderId
 * @return {object} data
 */

const request = require('superagent');
const endpoints = require('../util/endpoints');

module.exports = (headers, account_id, order_id) => {
    const endpoint = endpoints['cancelOrder'](account_id,order_id);
    return request
        .delete(`${endpoint}`)
        .set(headers)
        .send()
        .then(res => {
            const {
                body: {
                    data
                }
            } = res;

            return data;
        });
}
