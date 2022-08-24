import React from "react";
import { Image } from "@mantine/core";
import parse from "html-react-parser";
import { FaBed, FaBath } from "react-icons/fa";

function PropertyDetail() {
  return (
    <div>
      <div className="">
        <Image
          src="../../images/img-2.jpg"
          alt="post"
          radius="md"
          height={600}
        />
      </div>
      <div className="m-11 border-gray-200 border-1 shadow-lg bg-white p-5">
        <p className="text-4xl text-center">Property Detail</p>
        <div className="mt-10 lg:flex space-y-10 lg:space-y-0 justify-around">
          <div className="space-y-5">
            <h3 className="text-3xl">modern apartments</h3>
            <p className="text-gray-500 text-lg">Kathmandu, Nepal</p>
            {parse(`<p>This is description</p>`)}
            <div className="flex items-center justify-center">
              <span className="w-1/2 flex space-x-3">
                <FaBed className="text-primary text-2xl" /> <p>3 beds</p>
              </span>
              <span className="w-1/2 flex space-x-3">
                <FaBath className="text-primary text-2xl" /> <p>3 beds</p>
              </span>
            </div>
            <h3 className="text-primary text-2xl">Rs. 25,000/m</h3>
            <button className="w-full capitalize bg-light text-primary active:bg-primary active:text-light h-11 rounded-md">
              <a>Contact Seller</a>
            </button>
          </div>
          <div>
            <p>Google Map</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default PropertyDetail;
