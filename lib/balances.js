'use strict';

/**
 * Get Account Balances
 * @param {object} headers
 * @param {string} accountId
 * @return {object} account balances
 */

const request = require('superagent');
const endpoints = require('../util/endpoints');

module.exports = (headers, account_id) => {
    const endpoint = endpoints['balances'](account_id);
    return request
        .get(`${endpoint}`)
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
