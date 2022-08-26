import React, { useState, useEffect } from "react";
import Listings from "../components/Listings";
import axios from "axios";
import LoadWrapper from "../components/LoadWrapper";
import ListingModal from "../components/ListingModal";
import { useAuth } from "../context/AuthContext";

function AllListing() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [refresher, setRefresher] = useState(0);
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const getListings = async () => {
    let uri =
      auth?.currentUser?.role === "admin"
        ? "/estate"
        : "/estate/my/" + auth?.currentUser?.id;
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/api/v1" + uri,
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
  }, [refresher]);

  return (
    <>
      <LoadWrapper loading={loading} />
      <ListingModal open={open} setOpen={setOpen} listing={selected} />
      <div className="bg-white shadow-md rounded-md p-5">
        <p className="text-3xl">All Estate Listings</p>
        <div className="mt-10">
          <Listings
            listing={listing}
            setSelected={setSelected}
            setOpen={setOpen}
            setRefresher={setRefresher}
          />
        </div>
      </div>
    </>
  );
}

export default AllListing;
