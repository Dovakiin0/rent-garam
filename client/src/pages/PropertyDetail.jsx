import React, { useState } from "react";
import { Image } from "@mantine/core";
import parse from "html-react-parser";
import { FaBed, FaBath } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import LoadWrapper from "../components/LoadWrapper";
import GoogleMapComponent from "../components/GoogleMapComponent";

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSingleProperty = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/api/v1/estate/" + id,
        { onDownloadProgress: setLoading(true) }
      );
      if (status === 200) {
        setLoading(false);
        setProperty(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProperty();
  }, [id]);

  return loading ? (
    <LoadWrapper loading={loading} />
  ) : (
    <div>
      <div className="">
        <Image
          src={`http://localhost:3000/files/${property?.image_url}`}
          alt="post"
          radius="md"
          height={600}
        />
      </div>
      <div className="m-11 border-gray-200 border-1 shadow-lg bg-white p-5">
        <p className="text-4xl text-center">Property Detail</p>
        <div className="mt-10 space-y-5">
          <div className="space-y-5">
            <h3 className="text-3xl">{property?.name}</h3>
            <p className="text-gray-500 text-lg">{property?.address}</p>
            {parse(`${property?.description}`)}
            <div className="flex items-center justify-center">
              <span className="w-1/2 flex space-x-3">
                <FaBed className="text-primary text-2xl" />
                <p>{property?.bedroom} Bedrooms</p>
              </span>
              <span className="w-1/2 flex space-x-3">
                <FaBath className="text-primary text-2xl" />
                <p>{property?.washroom} Bathrooms</p>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p>Seller: {property?.fullname}</p>
                <p>Contact Email: {property?.email}</p>
                <p>Contact Phone: {property?.phone_no}</p>
              </div>
              <h3 className="text-primary text-2xl">Rs. {property?.price}/m</h3>
            </div>
            <button className="w-full capitalize bg-light text-primary active:bg-primary active:text-light h-11 rounded-md">
              <a>Contact Seller</a>
            </button>
          </div>
          <div>
            <GoogleMapComponent
              center={{ lat: property?.latitude, lng: property?.longitude }}
              marker={[{ lat: property?.latitude, lng: property?.longitude }]}
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default PropertyDetail;
