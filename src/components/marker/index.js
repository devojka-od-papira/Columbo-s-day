import React from "react";
import L from "leaflet";

const CustomMarker = ({ icon, latLngCoordinates }) => {
  const marker = L.marker(latLngCoordinates, { icon });

  return marker;
};

export default CustomMarker;
