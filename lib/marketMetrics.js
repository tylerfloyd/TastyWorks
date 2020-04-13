'use strict';

/**
 * Get market metrics
 * @param {object} headers
 * @param {object} array of tickers
 * @return {object} array of metrics
 */

const request = require('superagent');
const endpoints = require('../util/endpoints');

module.exports = (headers, tickers) => {
    const endpoint = endpoints['marketMetrics'](tickers);
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
