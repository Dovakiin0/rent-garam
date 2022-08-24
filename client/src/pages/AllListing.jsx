import React from "react";
import Listings from "../components/Listings";

function AllListing() {
  return (
    <div className="bg-white shadow-md rounded-md p-5">
      <p className="text-3xl">All Listings</p>
      <Listings />
    </div>
  );
}

export default AllListing;
