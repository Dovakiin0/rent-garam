import React from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import { ActionIcon } from "@mantine/core";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function GoogleMapComponent({ center, properties }) {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDbZyb_p4Z_cPZHkqAy97S6jahjFhfbp80",
  });
  const navigate = useNavigate();

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
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
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(e) => onMarkerChange(e)}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {properties?.map((m, i) => (
          <Marker
            key={i}
            position={{ lat: m.latitude, lng: m.longitude }}
            onClick={() => setActiveMarker(i)}
          >
            {activeMarker === i && (
              <InfoWindow>
                <div>
                  <h3 className="text-lg">{m.name}</h3>
                  <p>{m.address}</p>
                  <ActionIcon
                    onClick={() => {
                      navigate("/property/" + m.id);
                    }}
                  >
                    <BsBoxArrowUpRight color="darkorange" />
                  </ActionIcon>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </>
  ) : (
    <p>Loading</p>
  );
}

export default GoogleMapComponent;
