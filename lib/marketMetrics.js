'use strict';

/**
 * Get market metrics
 * @param {object} headers
 * @param {string} accountId
 * @param {object} array of tickers
 * @return {object} array of metrics
 */

const request = require('superagent');
const endpoints = require('../util/endpoints');

module.exports = (headers, account_id, tickers) => {
    const endpoint = endpoints['marketMetrics'](account_id, tickers);
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
        })
        .catch(err => err.message);
}
