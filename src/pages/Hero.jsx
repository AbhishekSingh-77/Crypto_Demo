import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/heroImage.jpg";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 min-h-screen flex items-center py-12 px-4 sm:px-6 md:px-12 lg:px-20 border-b-2 border-white">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
        {/* Left Section - Image */}
        <div className="w-full mt-7 md:w-1/2 flex justify-center">
          <div className="rounded-full bg-gradient-to-tr from-green-400 to-green-600 p-2 md:p-3">
            <img
              src={heroImage}
              alt="Crypto Demo"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:pt-7.5 md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              Make Easier <br />
              Your Crypto <br />
              <span className="text-green-700">Transactions.</span>
            </h1>

            <p className="text-gray-700 text-base sm:text-lg md:text-xl">
              "Say goodbye to slow, expensive transactions. Embrace fast,
              secure, and affordable crypto solutions — and take charge of your
              financial future today."
            </p>

            <div className="pt-2">
              <Link
                to="/register"
                className="inline-block bg-green-700 text-white hover:bg-white hover:text-green-700 font-bold px-6 py-3 rounded-full border-2 border-green-700 transition-all duration-200 hover:scale-105"
              >
                Start Exploring, No Cost
              </Link>
            </div>

            {/* Featured On Section */}
            <div className="pt-2">
              <div className="flex flex-col items-center md:items-start gap-3">
                <p className="text-green-700 font-bold text-lg md:text-xl">
                  Featured On
                </p>
                <div className="bg-gradient-to-r from-gray-800 to-black border border-gray-600 rounded-xl px-6 py-3 flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
                  {["TechCrunch", "FASTCOMPANY", "MIT", "Forbes"].map(
                    (brand) => (
                      <span
                        key={brand}
                        className="text-white font-bold text-sm md:text-base whitespace-nowrap"
                      >
                        {brand}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
