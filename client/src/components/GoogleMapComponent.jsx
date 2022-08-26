import React from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";

function GoogleMapComponent({ center, marker }) {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const [map, setMap] = useState(null);
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDbZyb_p4Z_cPZHkqAy97S6jahjFhfbp80",
  });

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(e) => onMarkerChange(e)}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {marker.map((m) => (
          <Marker key={m.id} position={m} />
        ))}
      </GoogleMap>
    </>
  ) : (
    <p>Loading</p>
  );
}

export default GoogleMapComponent;
