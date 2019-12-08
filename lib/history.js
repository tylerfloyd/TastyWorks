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

const doRequest = (headers, endpoint, start_date, end_date, pageOffset) => {
  return request
    .get(`${endpoint}`)
    .query({
      'start-date': `${start_date}T07:00:00.000Z`
    })
    .query({
      'end-date': `${end_date}T07:00:00.000Z`
    })
    .query({
      'page-offset': pageOffset
    })
    .set(headers)
    .send()
    .then(res => {
      const {
        body: {
          pagination,
          data: {
            items
          }
        }
      } = res;
      return { items, pagination };
    });
}

module.exports = async (headers, account_id, start_date, end_date) => {
  const endpoint = endpoints['history'](account_id);
  const items = [];
  let currentPage = -1;
  let keepGoing = true;
  while (keepGoing) { 
    const r = await doRequest(headers, endpoint, start_date, end_date, ++currentPage);

    if(r && !!r.message && r.status !=200){
      keepGoing = false;
    } else {
      items.push.apply(items, r.items);
      keepGoing = currentPage < r.pagination['total-pages'] - 1;
    }
  }
  return items;
}
