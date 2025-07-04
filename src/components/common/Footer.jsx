import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          HACK ADVAYA 12/4/2025 | {" "}
          <Link to={"/"} className="hover:underline">
            Made with love by Team FOMO   
          </Link>
           : Sarthak, Vidushi, Anushka ❤️
        </span>
      </div>
    </footer>
  );
};
