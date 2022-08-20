import React from "react";
import { Image } from "@mantine/core";
import { FaBath, FaBed, FaEnvelope, FaHeart, FaPhone } from "react-icons/fa";

function Property() {
  return (
    <div className="relative border-gray-200 border-2 shadow-lg bg-white capitalize flex flex-col items-center justify-center">
      <div>
        <Image src="images/img-1.jpg" alt="post" radius="md" />
        <div className="flex space-x-2 absolute top-0 p-2">
          <h3 className="bg-black text-white bg-opacity-30 p-1 rounded-md">
            3 days ago
          </h3>
          <h3 className="bg-black text-white bg-opacity-30 p-1 rounded-md">
            for rent
          </h3>
        </div>
      </div>
      <div className="flex flex-col space-y-5 p-10">
        <div className="flex items-center space-x-5">
          <h3 className="text-primary text-2xl">$25,000/m</h3>
          <FaHeart className="text-primary bg-light text-xl active:text-secondary cursor-pointer" />
          <FaEnvelope className="text-primary bg-light text-xl active:text-secondary cursor-pointer" />
          <FaPhone className="text-primary bg-light text-xl active:text-secondary cursor-pointer" />
        </div>
        <div className="location">
          <h3 className="text-3xl">modern apartments</h3>
          <p className="text-gray-500 text-lg">
            jogeshwari west, mumbai, india - 400104
          </p>
        </div>
        <div className="flex items-center justify-center">
          <span className="w-1/2 flex space-x-3">
            <FaBed className="text-primary text-2xl" /> <p>3 beds</p>
          </span>
          <span className="w-1/2 flex space-x-3">
            <FaBath className="text-primary text-2xl" /> <p>3 beds</p>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="w-1/2 capitalize bg-light text-primary active:bg-primary active:text-light h-11">
            request info
          </button>
          <button className="w-1/2 capitalize bg-light text-primary active:bg-primary active:text-light h-11">
            view details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Property;
