import React, { useState, useEffect } from "react";
import Listings from "../components/Listings";
import axios from "axios";
import LoadWrapper from "../components/LoadWrapper";

function AllListing() {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);

  const getListings = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/api/v1/estate/",
        { onDownloadProgress: setLoading(true) }
      );
      if (status === 200) {
        setListing(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <>
      <LoadWrapper loading={loading} />
      <div className="bg-white shadow-md rounded-md p-5">
        <p className="text-3xl">All Estate Listings</p>
        <div className="mt-10">
          <Listings listing={listing} />
        </div>
      </div>
    </>
  );
}

export default AllListing;
