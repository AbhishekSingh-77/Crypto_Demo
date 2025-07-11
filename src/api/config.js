const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_URLS = {
  livePrices: `${COINGECKO_BASE_URL}/simple/price`,
  exchangeRate: "https://open.er-api.com/v6/latest/USD",

  REGISTER: `${BASE_URL}/register/`,
  LOGIN: `${BASE_URL}/login/`,
  RESET_PASSWORD: `${BASE_URL}/reset-password/`,
  PROFILE: (email) => `${BASE_URL}/profile/${email}/`,
  PHOTO_UPLOAD: (email) => `${BASE_URL}/photo-upload/${email}/`,
  PHOTO_DELETE: (email) => `${BASE_URL}/photo-delete/${email}/`,
  WALLET_AMOUNT: (email) => `${BASE_URL}/wallet-amount/${email}/`,
  LIVE_PRICES: `${BASE_URL}/get-live-prices/`,
  PURCHASE_TOKENS: `${BASE_URL}/purchase-tokens/`,
  USER_TRANSACTIONS: (email) => `${BASE_URL}/transactions/${email}/`,
  PURCHASE_SUMMARY: (email) => `${BASE_URL}/purchased-token-summary/${email}/`,
  SELL_TOKENS: `${BASE_URL}/sell-tokens/`,
  TOKEN_BALANCES: (email) => `${BASE_URL}/token-balances/${email}/`,
  SELL_TRANSACTIONS: (email) => `${BASE_URL}/sell-transactions/${email}/`,
  PROFIT_LOSS_SUMMARY: (email) => `${BASE_URL}/profit-loss-summary/${email}/`,
};
