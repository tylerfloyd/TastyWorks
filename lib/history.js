'use strict';

/**
 * Get Account History
 * @param {object} headers
 * @param {string} account_id
 * @param {date} start_date (yyyy-mm-dd)
 * @param {date} end_date (yyyy-mm-dd)
 * @return {object} account history
 */

const request = require('superagent');
const endpoints = require('../util/endpoints');

module.exports = (headers, account_id, start_date, end_date) => {
    const endpoint = endpoints['history'](account_id);
    return request
        .get(`${endpoint}`)
        .query({
            'start-date': `${start_date}T07:00:00.000Z`
        })
        .query({
            'end-date': `${end_date}T07:00:00.000Z`
        })
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
        })
        .catch(err => {
            return err.message;
        });
}
