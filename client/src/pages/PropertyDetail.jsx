import React from "react";
import { Image } from "@mantine/core";
import parse from "html-react-parser";

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
        <p className="text-4xl">Property Detail</p>
        <div className="mt-10 flex justify-between">
          <div className="space-y-5">
            <h3 className="text-3xl">modern apartments</h3>
            <p className="text-gray-500 text-lg">Kathmandu, Nepal</p>
            {parse(`<p>This is description</p>`)}
            <h3 className="text-primary text-2xl">Rs. 25,000/m</h3>
          </div>
          <div>
            <p>GOOGLE MAP</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default PropertyDetail;
