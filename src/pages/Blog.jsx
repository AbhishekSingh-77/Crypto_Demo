import React, { useState } from "react";
import blog_blockchain from "../assets/blog_blockchain.jpeg";
import blog_top5Currencies from "../assets/blog_top5Currencies.jpeg";
import blog_digitalWallet from "../assets/blog_digitalWallet.jpeg";
import blog_defi from "../assets/blog_defi.jpeg";
import blog_investCrypto from "../assets/blog_investCrypto.jpeg";
import blog_cryptoScams from "../assets/blog_cryptoScams.jpeg";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Blockchain Basics",
    date: "June 27, 2025",
    image: blog_blockchain,
    excerpt:
      "A beginner-friendly guide to how blockchain technology powers the crypto world.",
  },
  {
    id: 2,
    title: "5 Top Cryptocurrencies to Watch in 2025",
    date: "June 24, 2025",
    image: blog_top5Currencies,
    excerpt:
      "Here are the crypto coins leading the market this year and what makes them stand out.",
  },
  {
    id: 3,
    title: "How Secure Are Digital Wallets?",
    date: "June 22, 2025",
    image: blog_digitalWallet,
    excerpt:
      "Explore the security features and vulnerabilities of popular crypto wallets.",
  },
  {
    id: 4,
    title: "The Rise of DeFi: What You Need to Know",
    date: "June 20, 2025",
    image: blog_defi,
    excerpt:
      "Decentralized finance is transforming the financial industry — here’s how it works and why it matters.",
  },
  {
    id: 5,
    title: "How to Start Investing in Crypto Safely",
    date: "June 18, 2025",
    image: blog_investCrypto,
    excerpt:
      "New to crypto investing? Here’s a practical guide to safely start your digital asset journey.",
  },
  {
    id: 6,
    title: "Top Crypto Scams and How to Avoid Them",
    date: "June 15, 2025",
    image: blog_cryptoScams,
    excerpt:
      "Stay safe while navigating the crypto space by learning about common scams and how to protect yourself.",
  },
];

const Blog = () => {
  const [visiblePosts, setVisiblePosts] = useState(3);

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 3);
  };

  return (
    <section className="px-4 md:px-16 lg:px-24 pt-18 pb-4 bg-gray-300 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
        Crypto Insights & Updates
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(0, visiblePosts).map((post) => (
          <div
            key={post.id}
            className="rounded-lg overflow-hidden shadow-lg bg-white transition hover:scale-105 duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-3">{post.date}</p>
              <p className="text-gray-700">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visiblePosts < blogPosts.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMorePosts}
            className="px-6 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default Blog;
