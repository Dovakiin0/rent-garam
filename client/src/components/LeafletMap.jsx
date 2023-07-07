import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { ActionIcon } from "@mantine/core";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function SetMarker({ cb, mode, moveTo }) {
  const [pos, setPos] = useState(moveTo ?? null);
  useMapEvents({
    mouseup(pos) {
      if (mode === "VIEW") return;
      setPos(pos.latlng);
      cb(pos.latlng);
    },
  });

  return pos === null ? null : <Marker position={pos}></Marker>;
}

function LeafletMap({ properties, cb, mode = "VIEW", moveTo }) {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (typeof moveTo !== "undefined") {
      map?.flyTo(
        {
          lat: moveTo.lat,
          lng: moveTo.lng,
        },
        map.getZoom()
      );
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        map?.flyTo(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          map.getZoom()
        )
      );
    }
  }, [map]);

  return (
    <MapContainer
      ref={setMap}
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={12}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <SetMarker cb={cb} mode={mode} moveTo={moveTo} />
      {properties?.map((m, i) => (
        <Marker key={i} position={{ lat: m.latitude, lng: m.longitude }}>
          <Popup>
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
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default LeafletMap;
