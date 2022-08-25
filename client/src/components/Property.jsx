import React from "react";
import { Image } from "@mantine/core";
import { FaBath, FaBed, FaEnvelope, FaHeart, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

function Property({ listing }) {
  return (
    <div className="relative border-gray-200 border-2 shadow-lg bg-white capitalize flex flex-col hover:scale-[1.01]">
      <div>
        <Image
          src={`http://localhost:3000/files/${listing?.image_url}`}
          alt="post"
          radius="md"
          height={250}
        />
        <div className="flex space-x-2 absolute top-0 p-2">
          <h3 className="bg-black text-white bg-opacity-30 p-1 rounded-md">
            3 days ago
          </h3>
          <h3 className="bg-black text-white bg-opacity-30 p-1 rounded-md">
            {listing?.type}
          </h3>
        </div>
      </div>
      <div className="flex flex-col space-y-5 p-5">
        <div className="flex items-center space-x-5">
          <h3 className="text-primary text-2xl">Rs. {listing?.price}/m</h3>
          <FaHeart className="text-primary bg-light text-xl active:text-secondary cursor-pointer" />
          <FaEnvelope className="text-primary bg-light text-xl active:text-secondary cursor-pointer" />
          <FaPhone className="text-primary bg-light text-xl active:text-secondary cursor-pointer" />
        </div>
        <div className="location">
          <h3 className="text-3xl">{listing?.name}</h3>
          <p className="text-gray-500 text-lg">{listing?.address}</p>
        </div>
        <div className="flex items-center justify-center">
          <span className="w-1/2 flex space-x-3">
            <FaBed className="text-primary text-2xl" />{" "}
            <p>{listing?.bedroom} beds</p>
          </span>
          <span className="w-1/2 flex space-x-3">
            <FaBath className="text-primary text-2xl" />{" "}
            <p>{listing?.bedroom} bathroom</p>
          </span>
        </div>
        <div className="flex items-center w-full">
          <Link to={`/property/${listing?.id}`} className="w-full">
            <button className="w-full capitalize bg-light text-primary active:bg-primary active:text-light h-11 rounded-md">
              view details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Property;
