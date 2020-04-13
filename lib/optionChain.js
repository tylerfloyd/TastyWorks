'use strict';

/**
 * Get market metrics
 * @param {object} headers
 * @param {string} ticker
 */

const request = require('superagent');
const endpoints = require('../util/endpoints');

module.exports = (headers, ticker) => {
    const endpoint = endpoints['optionChain'](ticker);
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
