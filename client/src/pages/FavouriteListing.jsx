import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Property from "../components/Property";
import { useAuth } from "../context/AuthContext";
import LoadWrapper from "../components/LoadWrapper";

function FavouriteListing() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const getProperties = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/api/v1/favourite/" + auth?.currentUser?.id,
        { onDownloadProgress: setLoading(true) }
      );
      if (status === 200) {
        setLoading(false);
        setProperties(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  console.log(properties);

  return (
    <>
      <LoadWrapper loading={loading} />
      <div className="bg-white shadow-md rounded-md p-5">
        <p className="text-3xl">Favourite Estate Listings</p>
        <div className="m-10 grid lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-3 gap-4">
          {properties.map((property, i) => (
            <Property listing={property} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default FavouriteListing;
