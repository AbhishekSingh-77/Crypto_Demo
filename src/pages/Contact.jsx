import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  return (
    <section className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 min-h-screen pt-22 px-4 sm:px-8 md:px-16 lg:px-20">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16 mb-14">
        <div className="flex-1 max-w-md mb-8 lg:mb-0">
          <h3 className="text-green-700 text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">
            Crypto_Demo
          </h3>
          <p className="text-base sm:text-lg leading-relaxed text-gray-700">
            We'd love to hear from you! At{" "}
            <span className="text-xl font-bold text-green-700">
              Crypto_Demo
            </span>
            , we're dedicated to bringing you the latest insights, market
            trends, and secure crypto solutions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full lg:w-auto justify-evenly items-stretch gap-8">
          <div className="flex-1 min-w-[140px]">
            <h4 className="text-2xl font-semibold mb-4 text-gray-800">About</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="hover:text-green-700 hover:font-bold transition-colors duration-200"
                >
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-green-700 hover:font-bold transition-colors duration-200"
                >
                  FEATURES
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-green-700 hover:font-bold transition-colors duration-200"
                >
                  NEWS
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-1 min-w-[140px]">
            <h4 className="text-2xl font-semibold mb-4 text-gray-800">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="hover:text-green-700 hover:font-bold transition-colors duration-200"
                >
                  CRYPTOCODE
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-green-700 hover:font-bold transition-colors duration-200"
                >
                  SECURITY
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-green-700 hover:font-bold transition-colors duration-200"
                >
                  RANKINGS
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-1 min-w-[140px]">
            <h4 className="text-2xl font-semibold mb-4 text-gray-800">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="hover:text-green-700 hover:font-bold transition-colors duration-200"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-green-700 hover:font-bold transition-colors duration-200"
                >
                  SUPPORT
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-green-700 hover:font-bold transition-colors duration-200"
                >
                  CONTACT US
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-center gap-10 mb-14">
        {/* Social Section */}
        <div className="flex flex-col items-start w-full xl:w-5/12 space-y-5">
          <h4 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Follow Us
          </h4>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Stay connected with Crypto_Demo for updates, insights, and community
            highlights.
          </p>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              aria-label="Visit Facebook"
              className="p-2 sm:p-3 rounded-full border border-gray-300 bg-white shadow hover:bg-green-400 transition"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="text-xl sm:text-2xl"
                style={{ color: "#1877F2" }}
              />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              aria-label="Visit Instagram"
              className="p-2 sm:p-3 rounded-full border border-gray-300 bg-white shadow hover:bg-green-400 transition"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-xl sm:text-2xl"
                style={{ color: "#E1306C" }}
              />
            </a>
            <a
              href="https://in.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label="Visit LinkedIn"
              className="p-2 sm:p-3 rounded-full border border-gray-300 bg-white shadow hover:bg-green-400 transition"
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="text-xl sm:text-2xl"
                style={{ color: "#0A66C2" }}
              />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
              aria-label="Visit YouTube"
              className="p-2 sm:p-3 rounded-full border border-gray-300 bg-white shadow hover:bg-green-400 transition"
            >
              <FontAwesomeIcon
                icon={faYoutube}
                className="text-xl sm:text-2xl"
                style={{ color: "#FF0000" }}
              />
            </a>
          </div>
        </div>

        {/* Subscription Newsletter Section */}
        <div className="bg-gradient-to-br from-green-600 to-green-400 border-2 border-white rounded-2xl p-5 sm:p-8 w-full xl:w-7/12 shadow-lg">
          <div className="flex flex-col gap-4">
            <h5 className="text-white text-xl sm:text-2xl font-semibold">
              Join 'Crypto_Demo' for the Latest News & Mining Tips
            </h5>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
              <input
                type="email"
                id="email"
                placeholder="Your email address"
                className="flex-1 bg-white border-none rounded-full text-gray-800 p-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-green-700 shadow"
              />
              <button
                type="submit"
                className="bg-black text-white font-bold py-3 px-8 rounded-full text-base sm:text-lg border-b-2 border-transparent cursor-pointer hover:bg-white hover:text-green-700 hover:border-green-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <hr className="border-gray-400" />

      <div className="text-center text-xs sm:text-sm py-2 text-gray-600">
        &copy; 2025-26{" "}
        <span className="font-semibold text-green-700">Crypto_Demo</span>. All
        Rights Reserved
      </div>
    </section>
  );
};

export default Contact;
