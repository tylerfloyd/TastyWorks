const baseURL = 'https://api.tastyworks.com';

module.exports = {
    login: () => `${baseURL}/sessions`,
    validateLogin: () => `${baseURL}/sessions/validate`,
    accounts: () => `${baseURL}/customers/me/accounts`,
    balances: (account_id) => `${baseURL}/accounts/${account_id}/balances`,
    positions: (account_id) => `${baseURL}/accounts/${account_id}/positions`,
    liveOrders: (account_id) => `${baseURL}/accounts/${account_id}/orders/live`,
    executeOrder: (account_id) => `${baseURL}/accounts/${account_id}/orders`,
    cancelOrder: (account_id, order_id) => `${baseURL}/accounts/${account_id}/orders/${order_id}`,
    history: (account_id) => `${baseURL}/accounts/${account_id}/transactions`
    // TODO: '{url}/dry-run'
}
