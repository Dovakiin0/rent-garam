import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import LoadWrapper from "../components/LoadWrapper";
import Property from "../components/Property";

function Search() {
  const location = useLocation();
  const { type, address, min_price, max_price, bedroom, washroom } =
    location.state.value;

  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  const getQuery = async () => {
    try {
      const { data, status } = await axios.get(
        `http://localhost:3000/api/v1/estate/all/e/query?type=${type}&address=${address}&min_price=${min_price}&max_price=${max_price}&bedroom=${bedroom}&washroom=${washroom}`,
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
    getQuery();
  }, []);

  return (
    <>
      <LoadWrapper loading={loading} />
      <section
        className="mt-11 flex flex-col justify-between items-center"
        id="featured"
      >
        <h1 className="text-4xl">
          <span className="text-primary bg-light p-3">Search</span> Results
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

export default Search;
