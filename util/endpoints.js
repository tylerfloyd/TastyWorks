const baseURL = 'https://api.tastyworks.com';
//trade.dough.com

module.exports = {
    login: () => `${baseURL}/sessions`,
    validateLogin: () => `${baseURL}/sessions/validate`,
    accounts: () => `${baseURL}/customers/me/accounts`,
    balances: (account_id) => `${baseURL}/accounts/${account_id}/balances`,
    positions: (account_id) => `${baseURL}/accounts/${account_id}/positions`,
    liveOrders: (account_id) => `${baseURL}/accounts/${account_id}/orders/live`,
    executeOrder: (account_id) => `${baseURL}/accounts/${account_id}/orders`,
    cancelOrder: (account_id, order_id) => `${baseURL}/accounts/${account_id}/orders/${order_id}`,
    streamer: () => `${baseURL}/quote-streamer-tokens`,
	optionChain: (ticker) => `${baseURL}/option-chains/${ticker}/nested`,
    history: (account_id) => `${baseURL}/accounts/${account_id}/transactions`
    // TODO: '{url}/dry-run'
}
