import React from "react";
import Property from "../components/Property";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import LoadWrapper from "../components/LoadWrapper";

function FeaturedProperties() {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  const getListings = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/api/v1/estate",
        { onDownloadProgress: setLoading(true) }
      );
      if (status === 200) {
        setProperties(data);
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
      <section
        className="mt-11 flex flex-col justify-between items-center"
        id="featured"
      >
        <h1 className="text-4xl">
          <span className="text-primary bg-light p-3">Recent</span> Properties
        </h1>

        <div className="m-10 grid lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-3 gap-4">
          {properties.map((property, i) => (
            <Property listing={property} key={i} />
          ))}
        </div>
      </section>
    </>
  );
}

export default FeaturedProperties;
