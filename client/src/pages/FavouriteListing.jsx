import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Property from "../components/Property";
import { useAuth } from "../context/AuthContext";
import LoadWrapper from "../components/LoadWrapper";
import { RiEmotionSadLine } from "react-icons/ri";

function FavouriteListing() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresher, setRefresher] = useState(0);
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
      setProperties([]);
      console.log(error);
    }
  };

  useEffect(() => {
    getProperties();
  }, [refresher]);

  return (
    <>
      <LoadWrapper loading={loading} />
      <div className="bg-white shadow-md rounded-md p-5">
        <p className="text-3xl">Favourite Estate Listings</p>
        {properties.length > 0 ? (
          <div className="m-10 grid xl:grid-cols-5 sm:grid-cols-1 lg:grid-cols-2 gap-4">
            {properties.map((property, i) => (
              <Property
                listing={property}
                key={i}
                mode={1}
                setRefresher={setRefresher}
              />
            ))}
          </div>
        ) : (
          <div className="m-28 flex items-center justify-center space-x-2">
            <p className="text-xl text-gray-500">Nothing to show</p>
            <RiEmotionSadLine className="text-2xl text-gray-500" />
          </div>
        )}
      </div>
    </>
  );
}

export default FavouriteListing;
