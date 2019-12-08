'use strict';

/**
 * Get Accounts
 * @param {object} headers
 * @return {object} array of accounts
 */

const request = require('superagent');
const endpoints = require('../util/endpoints');

module.exports = (headers) => {
    const endpoint = endpoints['accounts']();
    return request
        .get(`${endpoint}`)
        .set(headers)
        .then(res => {
            const {
                body: {
                    data: {
                        items
                    }
                }
            } = res;

            const accounts = items.map(data => {
                const {
                    account
                } = data;

                return account;
            });

            return accounts;
        });
}
