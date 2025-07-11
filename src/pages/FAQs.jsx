import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "What is cryptocurrency?",
    answer:
      "Cryptocurrency is a digital or virtual currency secured by cryptography, making it nearly impossible to counterfeit or double-spend.",
  },
  {
    id: 2,
    question: "How does blockchain work?",
    answer:
      "A blockchain is a distributed ledger maintained by a network of computers. Every transaction is recorded in a block, which is linked to the previous block, forming a secure chain.",
  },
  {
    id: 3,
    question: "Is investing in crypto safe?",
    answer:
      "Like any investment, cryptocurrencies carry risks. It’s important to research projects, use secure wallets, and never invest more than you can afford to lose.",
  },
  {
    id: 4,
    question: "What is a digital wallet?",
    answer:
      "A digital wallet is a secure app or hardware device used to store, send, and receive cryptocurrencies.",
  },
  {
    id: 5,
    question: "How do I buy cryptocurrency?",
    answer:
      "You can buy cryptocurrencies on exchanges like Coinbase, Binance, or WazirX using traditional currency (INR, USD, etc.).",
  },
];

const Faq = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="px-4 md:px-16 lg:px-24 pt-18 pb-4 bg-gray-300 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
        Frequently Asked Questions
      </h1>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border rounded-md p-4 shadow-md bg-white"
          >
            <button
              onClick={() => toggleFaq(faq.id)}
              className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-800"
            >
              {faq.question}
              <span className="text-green-600 text-[18px] leading-none border-2 border-green-600 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                {openFaq === faq.id ? "-" : "+"}
              </span>
            </button>
            {openFaq === faq.id && (
              <p className="mt-3 text-gray-700 text-base">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
