import React from "react";
import { Link } from "react-router-dom";
import about_blockchain from "../assets/about_blockchain.png";

const About = () => {
  return (
    <section className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 min-h-screen px-2 py-4 sm:px-6 pt-8 md:p-10 flex flex-col items-center border-b-2 border-white">
      <h1 className="text-green-700 text-3xl sm:text-4xl md:text-5xl font-bold pt-18 md:pt-10 sm:mt-4 mb-6 sm:mb-12 text-center leading-tight">
        Our Mission, Your Future
      </h1>

      <div className="flex flex-col lg:flex-row lg:items-start gap-6 sm:gap-10 lg:gap-4 w-full max-w-7xl">
        <div className="flex-1 mx-3 sm:mx-6 md:mx-10 space-y-4 sm:space-y-4 text-base sm:text-lg md:text-center lg:text-left">
          <p>
            At "
            <span className="font-bold text-lg sm:text-xl">Crypto_Demo</span>",
            our mission is to redefine the way the world transacts and invests.
          </p>
          <p>
            We believe financial freedom should be fast, secure, and accessible
            to everyone – and{" "}
            <span className="font-bold text-lg sm:text-xl">
              Blockchain Technology
            </span>{" "}
            makes that possible.
          </p>
          <p>
            From seamless transactions to secure digital wallets and smart
            investment tools, our platform is designed to put the power back in
            your hands.
          </p>
          <p>
            Join us on this journey to reshape global finance. Together, we're
            not just imagining the future – we're building it.
          </p>
        </div>

        <div className="flex-shrink-0 flex justify-center w-full md:mx-auto lg:w-auto">
          <img
            src={about_blockchain}
            alt="Blockchain Technology"
            className="border border-white w-90 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-48 sm:h-60 md:h-72  rounded-xl shadow-2xl object-cover object-center transition duration-300 hover:scale-105"
          />
        </div>
      </div>

      <Link
        to="/register"
        className="mt-8 sm:mt-10 md:mt-6 px-6 sm:px-8 py-3 sm:py-4 bg-green-700 text-white font-bold text-lg sm:text-xl rounded-full hover:bg-white hover:text-green-700 border-2 border-green-700 transition-all duration-200 ease-in-out text-center"
      >
        Join Us Now
      </Link>
    </section>
  );
};

export default About;
