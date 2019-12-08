'use strict';

/**
 * Get Authorization Token
 * @param {string} username
 * @param {string} passworde
 * @return {string} session token
 */

const request = require('superagent');
const endpoints = require('../util/endpoints');

module.exports = (username, password, headers) => {
    const endpoint = endpoints['login']();
    return request
        .post(`${endpoint}`)
        .set(headers)
        .send({
            login: username,
            password: password
        })
        .then(res => {
            const {
                body: {
                    data
                }
            } = res;
            return data['session-token'];
        });
}
