import React from "react";

const Service = () => {
  return (
    <section className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 min-h-screen py-20 px-6 md:px-24 border-b-2 border-white">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight lg:text-left mb-12">
          Crypto_Demo Makes Managing Your Crypto - Profits Effortless.
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: "📝",
            title: "Create an Account",
            desc: "Sign up quickly and securely to access the Crypto_Demo dashboard.",
          },
          {
            icon: "📈",
            title: "Check Live Prices",
            desc: "Stay updated with real-time market prices for top crypto assets.",
          },
          {
            icon: "💱",
            title: "Buy or Sell Tokens",
            desc: "Trade easily with fast, reliable transactions at your fingertips.",
          },
          {
            icon: "💸",
            title: "Make Profits",
            desc: "Grow your balance and track profits effortlessly on your dashboard.",
          },
        ].map((step, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition duration-300 text-center border-2 border-green-600"
          >
            <div className="text-green-600 text-5xl mb-4">{step.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
