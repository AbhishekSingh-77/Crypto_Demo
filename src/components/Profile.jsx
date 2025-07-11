import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LogOut, UserCircle } from "lucide-react";
import { API_URLS } from "../api/config";

const coinData = [
  { id: "bitcoin", name: "Bitcoin (BTC)" },
  { id: "ethereum", name: "Ethereum (ETH)" },
  { id: "tether", name: "Tether (USDT)" },
  { id: "dogecoin", name: "Dogecoin (DOGE)" },
  { id: "solana", name: "Solana (SOL)" },
  { id: "cardano", name: "Cardano (ADA)" },
];

const formatPrice = (value) => {
  return value?.toLocaleString("en-US", { maximumFractionDigits: 2 }) || "N/A";
};

const Spinner = () => (
  <div className="w-16 h-16 border-4 border-green-600 border-dotted rounded-full animate-spin mx-auto mb-4"></div>
);

const rowsPerPage = 6;

const Profile = () => {
  const [profile, setProfile] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState({});
  const [walletAmount, setWalletAmount] = useState(0);
  const [purchaseSelectedCoin, setPurchaseSelectedCoin] = useState("");
  const [purchaseTokenQuantity, setPurchaseTokenQuantity] = useState(1);
  const [sellSelectedCoin, setSellSelectedCoin] = useState("");
  const [sellTokenQuantity, setSellTokenQuantity] = useState("1");
  const [transactions, setTransactions] = useState([]);
  const [usdToInr, setUsdToInr] = useState(83.45);
  const [tokenSummary, setTokenSummary] = useState([]);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [purchasePage, setPurchasePage] = useState(1);
  const [sellPage, setSellPage] = useState(1);
  const [summary, setSummary] = useState([]);

  // Purchase History Pagination
  const currentPurchases = useMemo(
    () => transactions.filter((tx) => tx.type === "buy"),
    [transactions]
  );
  const indexofPurchaseLastRow = purchasePage * rowsPerPage;
  const indexofPurchaseFirstRow = indexofPurchaseLastRow - rowsPerPage;
  const currentPurchaseData = currentPurchases.slice(
    indexofPurchaseFirstRow,
    indexofPurchaseLastRow
  );
  const totalPurchasePages = Math.ceil(currentPurchases.length / rowsPerPage);
  // Sell History Pagination
  const sellTransaction = useMemo(
    () => transactions.filter((tx) => tx.type === "sell"),
    [transactions]
  );
  const indexofSellLastRow = sellPage * rowsPerPage;
  const indexofSellFirstRow = indexofSellLastRow - rowsPerPage;
  const currentSellData = sellTransaction.slice(
    indexofSellFirstRow,
    indexofSellLastRow
  );
  const totalSellPages = Math.ceil(sellTransaction.length / rowsPerPage);
  const goToPurchasePage = (pageNumber) => {
    setPurchasePage(pageNumber);
  };
  const goToSellPage = (pageNumber) => {
    setSellPage(pageNumber);
  };

  const totalTokens = tokenSummary.reduce(
    (acc, item) => acc + Number(item.total_tokens),
    0
  );
  const totalPortfolioValue = tokenSummary.reduce(
    (acc, item) => acc + Number(item.total_value),
    0
  );

  const navigate = useNavigate();

  const fetchProfile = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get(API_URLS.PROFILE(email));
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchPrices = async () => {
    try {
      const response = await axios.get(API_URLS.livePrices, {
        params: {
          ids: "bitcoin,ethereum,tether,dogecoin,solana,cardano",
          vs_currencies: "usd",
        },
      });
      setPrices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
      setLoading(false);
    }
  };

  const fetchWalletAmount = async () => {
    const email = localStorage.getItem("email");
    try {
      const res = await axios.get(API_URLS.WALLET_AMOUNT(email));
      setWalletAmount(res.data.wallet_amount);
    } catch (err) {
      console.error("Error fetching wallet amount:", err);
    }
  };

  const fetchTransactions = async () => {
    const email = localStorage.getItem("email");
    try {
      const res = await axios.get(API_URLS.USER_TRANSACTIONS(email));
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
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

  const fetchTokenSummary = async () => {
    const email = localStorage.getItem("email");
    try {
      const res = await axios.get(API_URLS.PURCHASE_SUMMARY(email));
      setTokenSummary(res.data);
    } catch (err) {
      console.error("Error fetching token summary:", err);
    }
  };

  const fetchTokenBalances = async () => {
    const email = localStorage.getItem("email");
    try {
      const res = await axios.get(API_URLS.TOKEN_BALANCES(email));
      setTokenBalances(res.data.balances);
    } catch (err) {
      console.error("Error fetching token balances:", err);
    }
  };

  const fetchSummary = async () => {
    const email = localStorage.getItem("email");
    try {
      const res = await axios.get(API_URLS.PROFIT_LOSS_SUMMARY(email));
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to fetch profit/loss summary:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatPriceInInr = (usdPrice) => {
    return (usdPrice * usdToInr).toFixed(2);
  };

  useEffect(() => {
    fetchProfile();
    fetchPrices();
    fetchWalletAmount();
    fetchTransactions();
    fetchSummary();
    fetchExchangeRate();
    fetchTokenSummary();
    fetchTokenBalances();
    const intervalPrices = setInterval(fetchPrices, 10000);
    const intervalRates = setInterval(fetchExchangeRate, 60000);
    return () => {
      clearInterval(intervalPrices);
      clearInterval(intervalRates);
    };
  }, []);

  const handlePurchase = async () => {
    const email = localStorage.getItem("email");
    try {
      const res = await axios.post(API_URLS.PURCHASE_TOKENS, {
        email,
        coin: purchaseSelectedCoin.toLowerCase(),
        quantity: purchaseTokenQuantity,
      });
      if (res.status === 200) {
        toast.success(res.data.message || "Purchase successful!");
        setWalletAmount(res.data.wallet_amount);
        fetchTransactions();
        fetchTokenSummary();
        fetchTokenBalances();
        fetchSummary();
        setPurchaseSelectedCoin("");
        setPurchaseTokenQuantity(1);
      } else {
        toast.error(res.data.error || "Failed to purchase tokens.");
      }
    } catch (err) {
      console.error("Purchase failed:", err);
      if (err.response) {
        const errorMsg = err.response.data?.error;
        if (errorMsg?.toLowerCase().includes("insufficient")) {
          toast.error("Insufficient wallet balance.");
        } else if (errorMsg) {
          toast.error(errorMsg);
        } else {
          toast.error("An unexpected server error occurred.");
        }
      } else if (err.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  const handleSubmit = async () => {
    const email = localStorage.getItem("email");
    try {
      const res = await axios.post(API_URLS.SELL_TOKENS, {
        email,
        coin: sellSelectedCoin.toLowerCase(),
        quantity: sellTokenQuantity,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        setWalletAmount(res.data.wallet_amount);
        fetchTransactions();
        fetchTokenSummary();
        fetchTokenBalances();
        fetchSummary();
        setSellSelectedCoin("");
        setSellTokenQuantity(1);
      } else {
        toast.error(res.data.error || "Failed to sell tokens.");
      }
    } catch (err) {
      console.error("Sell failed:", err);
      if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully!", { autoClose: 1000 });
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Spinner />
          <p className="text-lg font-semibold text-green-700">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-full mt-16 mb-2 mx-2 p-6 bg-white rounded-2xl shadow-xl border border-green-600">
      {/* Heading */}
      <div className="flex flex-col lg:flex-row justify-evenly items-center gap-6 mb-8 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700">
          Welcome to Your Crypto Dashboard, {profile.username.toUpperCase()}!
        </h1>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/userDetails"
            className="flex items-center justify-center gap-2 px-8 py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
          >
            <UserCircle size={18} />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 
        text-white font-bold px-8 py-3 rounded-lg transition cursor-pointer"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Left Column */}
        {/* Live Crypto Prices */}
        <div className="md:col-span-2 p-6 border rounded-xl shadow bg-gray-50">
          <h2 className="text-xl text-center font-bold uppercase text-green-700 mb-7">
            Live Crypto Prices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coinData.map((coin) => (
              <div
                key={coin.id}
                className="border border-green-600 p-2 rounded-xl bg-white text-center 
          shadow transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-green-800"
              >
                <h3 className="font-bold text-green-600">{coin.name}</h3>
                <p className="text-lg font-extrabold">
                  ${formatPrice(prices[coin.id]?.usd)}
                </p>
                <p className="text-sm text-gray-600">
                  ₹{formatPriceInInr(prices[coin.id]?.usd)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 flex flex-col space-y-6">
          {/* Wallet Balance */}
          <div className="p-6 border rounded-xl shadow bg-gray-50 text-center">
            <p className="text-xl font-bold text-green-700 mb-2">
              Wallet Balance
            </p>
            <p className="text-3xl font-extrabold text-green-800">
              $ {walletAmount.toLocaleString("en-US")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Purchase Crypto Grid */}
            <div className="p-4 border rounded-xl shadow bg-gray-50">
              <h2 className="text-xl font-bold text-green-700 mb-4">
                Buy Crypto
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePurchase();
                }}
                className="grid grid-cols-1 gap-4"
              >
                <select
                  value={purchaseSelectedCoin}
                  onChange={(e) => setPurchaseSelectedCoin(e.target.value)}
                  className="border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="" disabled hidden>
                    Select Coin
                  </option>
                  <option value="Bitcoin">Bitcoin</option>
                  <option value="Ethereum">Ethereum</option>
                  <option value="Tether">Tether</option>
                  <option value="Dogecoin">Dogecoin</option>
                  <option value="Solana">Solana (SOL)</option>
                  <option value="Cardano">Cardano (ADA)</option>
                </select>
                <input
                  type="number"
                  value={purchaseTokenQuantity}
                  onChange={(e) => setPurchaseTokenQuantity(e.target.value)}
                  className="border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-green-500"
                  min={1}
                  placeholder="Quantity"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold 
          rounded-lg transition cursor-pointer py-3"
                >
                  Confirm Buy
                </button>
              </form>
            </div>

            {/* Sell Crypto Grid */}
            <div className="p-4 border rounded-xl shadow bg-gray-50">
              <h2 className="text-xl font-bold text-green-700 mb-4">
                Sell Crypto
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="grid grid-cols-1 gap-4"
              >
                <select
                  value={sellSelectedCoin}
                  onChange={(e) => setSellSelectedCoin(e.target.value)}
                  className="border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="" disabled hidden>
                    Select Coin
                  </option>
                  {coinData.map((coin) => (
                    <option key={coin.id} value={coin.id}>
                      {coin.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={sellTokenQuantity}
                  onChange={(e) => setSellTokenQuantity(e.target.value)}
                  className="border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-green-500"
                  min={1}
                  required
                  placeholder="Quantity"
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg 
          transition cursor-pointer py-3"
                >
                  Confirm Sell
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-green-700 m-6 uppercase text-center">
        Crypto Portfolio Summary
      </h2>
      {/* Current Token Balance Table */}
      <div className="p-4 border rounded-xl shadow bg-white overflow-x-auto my-4">
        <h3 className="text-lg font-bold text-green-700 mb-4">
          Current Token Balances
        </h3>
        <table className="min-w-full bg-white border border-green-600 rounded-lg text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 border-b">Coin</th>
              <th className="py-3 px-4 border-b">Available Quantity</th>
            </tr>
          </thead>
          <tbody>
            {tokenBalances.length === 0 ? (
              <tr>
                <td colSpan="2" className="py-4 text-gray-500">
                  No token balances available.
                </td>
              </tr>
            ) : (
              <>
                {tokenBalances.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                      {item.coin.toUpperCase()}
                    </td>
                    <td className="py-2 px-4 border-b">{item.quantity}</td>
                  </tr>
                ))}

                <tr className="font-bold bg-green-100">
                  <td className="py-2 px-4 border-t">TOTAL</td>
                  <td className="py-2 px-4 border-t">
                    {tokenBalances.reduce(
                      (sum, item) => sum + Number(item.quantity),
                      0
                    )}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border rounded-xl shadow bg-gray-50 overflow-x-auto">
        {/* Total Purchased Tokens */}
        <div className="p-4 border rounded-xl shadow bg-white overflow-x-auto mb-6">
          <h3 className="text-lg font-bold text-green-700 mb-4">
            Total Purchased Tokens
          </h3>
          <table className="min-w-full bg-white border border-green-600 rounded-lg text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 border-b">Coin</th>
                <th className="py-3 px-4 border-b">Total Tokens</th>
                <th className="py-3 px-4 border-b">Total Value ($)</th>
              </tr>
            </thead>
            <tbody>
              {tokenSummary.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-4 text-gray-500">
                    No purchases yet.
                  </td>
                </tr>
              ) : (
                tokenSummary.map((item) => (
                  <tr key={item.coin} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                      {item.coin.toUpperCase()}
                    </td>
                    <td className="py-2 px-4 border-b">{item.total_tokens}</td>
                    <td className="py-2 px-4 border-b">
                      $ {Number(item.total_value).toLocaleString("en-US")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {tokenSummary.length > 0 && (
              <tfoot className="font-bold bg-green-100">
                <tr>
                  <td className="py-3 px-4 border-t">Total</td>
                  <td className="py-3 px-4 border-t">{totalTokens}</td>
                  <td className="py-3 px-4 border-t">
                    $ {totalPortfolioValue.toLocaleString("en-US")}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {/* Purchase History Table */}
        <div className="p-4 border rounded-xl shadow bg-white overflow-x-auto">
          <h3 className="text-lg font-bold text-green-700 mb-4">
            Purchase History
          </h3>
          <table className="min-w-full bg-white border border-green-600 rounded-lg text-center">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 border-b">Coin</th>
                <th className="py-3 px-4 border-b">Quantity</th>
                <th className="py-3 px-4 border-b">Total ($)</th>
                <th className="py-3 px-4 border-b">Purchased At</th>
              </tr>
            </thead>
            <tbody>
              {currentPurchases.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-gray-500">
                    No purchase transactions yet.
                  </td>
                </tr>
              ) : (
                currentPurchaseData.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                      {tx.coin.toUpperCase()}
                    </td>
                    <td className="py-2 px-4 border-b">{tx.quantity}</td>
                    <td className="py-2 px-4 border-b">
                      ${Number(tx.total_price).toLocaleString("en-US")}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(tx.purchased_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex flex-wrap justify-center mt-2 space-x-2">
            <button
              onClick={() => goToPurchasePage(purchasePage - 1)}
              disabled={purchasePage === 1}
              className={`px-3 py-1 rounded cursor-pointer ${
                purchasePage === 1
                  ? "bg-gray-300"
                  : "bg-white text-green-600 border-2 border-green-600 hover:bg-green-700 hover:text-white"
              }`}
            >
              Previous
            </button>
            {[...Array(totalPurchasePages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPurchasePage(idx + 1)}
                className={`px-3 py-1 rounded cursor-pointer ${
                  purchasePage === idx + 1
                    ? "bg-black text-white"
                    : "bg-green-600 text-white hover:bg-black"
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => goToPurchasePage(purchasePage + 1)}
              disabled={purchasePage === totalPurchasePages}
              className={`px-3 py-1 rounded cursor-pointer ${
                purchasePage === totalPurchasePages
                  ? "bg-gray-300"
                  : "bg-white text-green-600 border-2 border-green-600 hover:bg-green-700 hover:text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Sell History Table */}
      <div className="p-4 border rounded-xl shadow bg-white overflow-x-auto mt-8">
        <h3 className="text-lg font-bold text-green-700 mb-4">Sell History</h3>
        <table className="min-w-full bg-white border border-green-600 rounded-lg text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 border-b">Coin</th>
              <th className="py-3 px-4 border-b">Quantity</th>
              <th className="py-3 px-4 border-b">Total ($)</th>
              <th className="py-3 px-4 border-b">Sold At</th>
            </tr>
          </thead>
          <tbody>
            {sellTransaction.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 text-gray-500">
                  No sell transactions yet.
                </td>
              </tr>
            ) : (
              currentSellData.map((tx, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    {tx.coin.toUpperCase()}
                  </td>
                  <td className="py-2 px-4 border-b">{tx.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    ${Number(tx.total_price).toLocaleString("en-US")}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(tx.purchased_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex flex-wrap justify-center mt-2 space-x-2">
          <button
            onClick={() => goToSellPage(sellPage - 1)}
            disabled={sellPage === 1}
            className={`px-3 py-1 rounded cursor-pointer ${
              sellPage === 1
                ? "bg-gray-300"
                : "bg-white text-green-600 border-2 border-green-600 hover:bg-green-700 hover:text-white"
            }`}
          >
            Previous
          </button>
          {[...Array(totalSellPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSellPage(idx + 1)}
              className={`px-3 py-1 rounded cursor-pointer ${
                sellPage === idx + 1
                  ? "bg-black text-white"
                  : "bg-green-600 text-white hover:bg-black"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => goToSellPage(sellPage + 1)}
            disabled={
              sellPage === Math.ceil(sellTransaction.length / rowsPerPage)
            }
            className={`px-3 py-1 rounded cursor-pointer ${
              sellPage === Math.ceil(sellTransaction.length / rowsPerPage)
                ? "bg-gray-300"
                : "bg-white text-green-600 border-2 border-green-600 hover:bg-green-700 hover:text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Profit - Loss Summary Table */}
      <div className="p-4 border rounded-xl shadow bg-white overflow-x-auto mt-8">
        <h3 className="text-lg font-bold text-green-700 mb-4">
          Profit / Loss Summary
        </h3>
        <table className="min-w-full bg-white border border-green-600 rounded-lg text-center">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 border-b">Coin</th>
              <th className="py-3 px-4 border-b">Purchased Qty</th>
              <th className="py-3 px-4 border-b">Invested ($)</th>
              <th className="py-3 px-4 border-b">Sold Qty</th>
              <th className="py-3 px-4 border-b">Earned ($)</th>
              <th className="py-3 px-4 border-b">Holding Qty</th>
              <th className="py-3 px-4 border-b">Holding Amount ($)</th>
              <th className="py-3 px-4 border-b">Net P/L ($)</th>
            </tr>
          </thead>
          <tbody>
            {summary.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-4 text-gray-500">
                  No summary available.
                </td>
              </tr>
            ) : (
              summary.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    {item.coin.toUpperCase()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {item.total_purchased_quantity}
                  </td>
                  <td className="py-2 px-4 border-b">
                    ${Number(item.total_invested).toLocaleString("en-US")}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {item.total_sold_quantity}
                  </td>
                  <td className="py-2 px-4 border-b">
                    ${Number(item.total_earned).toLocaleString("en-US")}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {item.holding_quantity}
                  </td>
                  <td className="py-2 px-4 border-b">
                    ${Number(item.holding_amount).toLocaleString("en-US")}
                  </td>
                  <td
                    className={`py-2 px-4 border-b font-bold ${
                      item.net_profit_loss >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ${Number(item.net_profit_loss).toLocaleString("en-US")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        toastClassName="text-lg font-bold bg-green-600 text-white rounded-lg shadow-lg"
        bodyClassName="text-lg"
        closeButton
      />
    </section>
  );
};

export default Profile;
