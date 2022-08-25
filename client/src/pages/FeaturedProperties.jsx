import React from "react";
import Property from "../components/Property";

function FeaturedProperties() {
  return (
    <section
      className="mt-11 flex flex-col justify-between items-center"
      id="featured"
    >
      <h1 className="text-4xl">
        <span className="text-primary bg-light p-3">Featured</span> Properties
      </h1>

      <div className="m-10 grid lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1 md:grid-cols-3 gap-4">
        <Property />
        <Property />
        <Property />
        <Property />
        <Property />
      </div>
    </section>
  );
}

export default FeaturedProperties;
