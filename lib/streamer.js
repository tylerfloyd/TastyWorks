'use strict';

/**
 * Get Account Orders
 * @param {object} headers
 * @param {string} accountId
 * @return {object} orders
 */

const request = require('superagent');
const endpoints = require('../util/endpoints');

module.exports = (headers) => {
    const endpoint = endpoints['streamer']();
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
