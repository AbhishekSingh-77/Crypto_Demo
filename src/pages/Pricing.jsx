import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URLS } from "../api/config";

const coinData = [
  { id: "bitcoin", name: "Bitcoin (BTC)" },
  { id: "ethereum", name: "Ethereum (ETH)" },
  { id: "tether", name: "Tether (USDT)" },
  { id: "dogecoin", name: "Dogecoin (DOGE)" },
  { id: "solana", name: "Solana (SOL)" },
  { id: "cardano", name: "Cardano (ADA)" },
];

const Pricing = () => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [usdToInr, setUsdToInr] = useState(83.45); // Default fallback rate

  useEffect(() => {
    fetchPrices();
    fetchExchangeRate();
    const intervalPrices = setInterval(fetchPrices, 30000);
    const intervalRates = setInterval(fetchExchangeRate, 60000);
    return () => {
      clearInterval(intervalPrices);
      clearInterval(intervalRates);
    };
  }, []);

  const fetchPrices = async () => {
    try {
      const response = await axios.get(
        `${API_URLS.livePrices}?ids=bitcoin,ethereum,tether,dogecoin,solana,cardano&vs_currencies=usd`
      );
      setPrices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
    }
  };

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(API_URLS.exchangeRate);

      if (response.data && response.data.rates && response.data.rates.INR) {
        const rate = response.data.rates.INR;
        setUsdToInr(rate);
        console.log("Live USD to INR rate:", rate);
      } else {
        console.warn(
          "Exchange rate data not available or malformed:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  const formatPrice = (value) => {
    return (
      value?.toLocaleString("en-US", { maximumFractionDigits: 2 }) || "N/A"
    );
  };

  const formatPriceInInr = (usdPrice) => {
    if (!usdPrice) return "N/A"; // Defensive check
    return (usdPrice * usdToInr).toFixed(2);
  };

  return (
    <section className="px-4 md:px-16 lg:px-24 pt-18 pb-4 bg-gray-300 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-green-700">
        Live Crypto Prices
      </h1>
      {loading ? (
        <div className="flex flex-col items-center justify-center text-center text-lg text-green-600 py-10">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 
          border-opacity-50 mb-4"
          ></div>
          Loading prices...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coinData.map((coin) => (
            <div
              key={coin.id}
              className="border-2 border-green-600 rounded-lg shadow-md p-6 text-center bg-white 
              hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-bold text-green-600 mb-3">
                {coin.name}
              </h2>
              <p className="text-3xl font-extrabold mb-2">
                ${formatPrice(prices[coin.id]?.usd)}
              </p>
              <p className="text-lg text-gray-600">
                ₹{formatPriceInInr(prices[coin.id]?.usd)}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col">
        <Link
          to="/register"
          className="mt-4 bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg mx-auto hover:bg-green-700 transition duration-300"
        >
          BUY NOW
        </Link>
      </div>
    </section>
  );
};

export default Pricing;
