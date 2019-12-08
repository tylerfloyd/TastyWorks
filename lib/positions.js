'use strict';

/**
 * Get Account Positions
 * @param {object} headers
 * @param {string} accountId
 * @return {object} account positions
 */

const request = require('superagent');
const endpoints = require('../util/endpoints');

module.exports = (headers, account_id) => {
    const endpoint = endpoints['positions'](account_id);
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
