import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadWrapper from "../components/LoadWrapper";
import Property from "../components/Property";
import { RiEmotionSadLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Search() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const getQuery = async ({
    type,
    address,
    min_price,
    max_price,
    bedroom,
    washroom,
  }) => {
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
    if (location.state !== null) {
      getQuery(location.state.value);
    } else {
      navigate("/");
    }
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

        {properties.length > 0 ? (
          <div className="m-10 grid xl:grid-cols-5 sm:grid-cols-1 lg:grid-cols-2 gap-4">
            {properties.map((property, i) => (
              <Property listing={property} key={i} />
            ))}
          </div>
        ) : (
          <div className="m-28 flex items-center space-x-2">
            <p className="text-xl text-gray-500">Nothing to show</p>
            <RiEmotionSadLine className="text-2xl text-gray-500" />
          </div>
        )}
      </section>
    </>
  );
}

export default Search;
