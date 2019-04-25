const baseURL = 'https://api.tastyworks.com';
//trade.dough.com

module.exports = {
    login: () => `${baseURL}/sessions`,
    validateLogin: () => `${baseURL}/sessions/validate`,
    accounts: () => `${baseURL}/customers/me/accounts`,
    balances: (account_id) => `${baseURL}/accounts/${account_id}/balances`,
    positions: (account_id) => `${baseURL}/accounts/${account_id}/positions`,
    liveOrders: (account_id) => `${baseURL}/accounts/${account_id}/orders/live`,
    history: (account_id) => `${baseURL}/accounts/${account_id}/transactions`,
	streamer: () => `${baseURL}/quote-streamer-tokens`,
	optionChain: (ticker) => `${baseURL}/option-chains/${ticker}/nested`
}
