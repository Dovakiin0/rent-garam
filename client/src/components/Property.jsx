import React from "react";
import { Image } from "@mantine/core";
import { FaBath, FaBed, FaEnvelope, FaHeart, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";
import { ErrorNotification, SuccessNotification } from "./Notifications";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Property({ listing, mode = 0, setRefresher }) {
  const auth = useAuth();

  const setFavourite = async () => {
    if (!auth?.currentUser) {
      ErrorNotification({ message: "You need to be logged in to favourite" });
      return;
    }
    try {
      const { data, status } = await axios.post(
        "http://localhost:3000/api/v1/favourite",
        { user_id: auth?.currentUser?.id, estate_id: listing?.id }
      );
      if (status === 201) {
        SuccessNotification({
          message:
            "Added to favourites. Visit Dashboard to view your favourites",
        });
      }
    } catch (error) {
      ErrorNotification({ message: "Error setting favourite" });
      console.log(error);
    }
  };

  const removeFavourite = async () => {
    if (!auth?.currentUser) {
      ErrorNotification({ message: "You need to be logged in to favourite" });
      return;
    }
    try {
      const { data, status } = await axios.delete(
        "http://localhost:3000/api/v1/favourite/" + listing?.favourite_id
      );
      if (status === 200) {
        setRefresher(Math.random());
        SuccessNotification({
          message: "Removed from favourites",
        });
      }
    } catch (error) {
      ErrorNotification({ message: "Error removing favourite" });
      console.log(error);
    }
  };

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
            {moment
              .utc(listing?.createdat)
              .local()
              .startOf("seconds")
              .fromNow()}
          </h3>
          <h3 className="bg-black text-white bg-opacity-30 p-1 rounded-md">
            {listing?.type}
          </h3>
        </div>
      </div>
      <div className="flex flex-col space-y-5 p-5">
        <div className="flex items-center space-x-5">
          {listing?.sold ? (
            <h3 className="text-primary text-2xl">Sold</h3>
          ) : (
            <h3 className="text-primary text-2xl">Rs. {listing?.price}/m</h3>
          )}
          {mode === 0 ? (
            <FaHeart
              onClick={setFavourite}
              className="text-primary bg-light text-xl active:text-secondary cursor-pointer"
            />
          ) : (
            <FaHeart
              onClick={removeFavourite}
              className="text-primary bg-light text-xl active:text-secondary cursor-pointer"
            />
          )}
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
