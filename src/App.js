import React, { useEffect, useRef, useState } from "react";
import {
  TileLayer,
  Map,
  Marker,
  Popup,
  FeatureGroup,
  Circle,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { EditControl } from "react-leaflet-draw";
import InputSearch from "./components/input";
import MyDrawer from "./components/drawer";
import myPin from "./assets/pin.png";
import L from "leaflet";
import { findMyLocationAction } from "./actions";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import "./reset.css";
import "./style.scss";

function App() {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const positionBelgrade = { lat: 44.8178131, lng: 20.4568974 };
  const [open, setOpen] = useState(false);
  const [coord, setCoord] = useState(null);
  const [locationCoordinates, setLocationCoordinats] = useState(null);

  const categoryData = useSelector((state) => state.geodata.categoryData);
  const locations = useSelector((state) => state.geodata.locations);
  const distance = useSelector((state) => state.geodata.distance);

  const handleClick = () => {
    setOpen(!open);
  };

  const clickFlyTo = (data) => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    const latLngCoordinates = {
      lat: "",
      lon: "",
    };

    setLocationCoordinats(data);

    latLngCoordinates.lat = data.properties.lat;
    latLngCoordinates.lon = data.properties.lon;

    setCoord(latLngCoordinates);
    map.flyTo(latLngCoordinates, 15, {
      duration: 2,
    });

    const LeafIcon = L.Icon.extend({
      options: {
        iconSize: [40, 45],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-12, -100],
      },
    });
    const myIcon = new LeafIcon({
      iconUrl: myPin,
    });
    const marker = L.marker(latLngCoordinates, { icon: myIcon });
    marker.addTo(map);
    marker.bindPopup("This is the selected location").openPopup();
    L.circle(latLngCoordinates, { radius: 5000 }).addTo(map);
  };

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    map.locate({
      setView: true,
    });
    map.on("locationfound", findMyLocation);
  }, []);

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    const latLngCoordinates = {
      lat: "",
      lon: "",
    };

    // if (locationCoordinates) {
    //   latLngCoordinates.lat = locationCoordinates?.properties.lat;
    //   latLngCoordinates.lon = locationCoordinates?.properties.lon;
    //   L.circle(latLngCoordinates, { radius: distance * 100 }).addTo(map);
    // }
  }, [distance]);

  function findMyLocation(event) {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    const LeafIcon = L.Icon.extend({
      options: {
        iconSize: [40, 45],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-12, -100],
      },
    });

    const myIcon = new LeafIcon({
      iconUrl: myPin,
    });

    L.control
      .zoom({
        position: "topright",
      })
      .addTo(map);

    const latLng = event.latlng;
    const marker = L.marker(latLng, { icon: myIcon });

    dispatch(findMyLocationAction(latLng));
    marker.addTo(map);
    marker.bindPopup("This is my Location").openPopup();
  }

  return (
    <div className="App">
      <MyDrawer open={open} selectedLocation={coord} />
      <InputSearch handleClick={handleClick} clickFlyTo={clickFlyTo} />
      <Map
        center={positionBelgrade}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {categoryData
          ? categoryData.map((coordinates, index) => {
              return (
                <Marker
                  key={index}
                  position={[
                    coordinates.geometry.coordinates[1],
                    coordinates.geometry.coordinates[0],
                  ]}
                >
                  <Popup>{coordinates.properties.name}</Popup>
                </Marker>
              );
            })
          : null}
        {locations
          ? locations.map((coordinates, index) => {
              return (
                <Marker
                  key={index}
                  position={[
                    coordinates.geometry.coordinates[1],
                    coordinates.geometry.coordinates[0],
                  ]}
                >
                  <Popup>{coordinates.properties.name}</Popup>
                </Marker>
              );
            })
          : null}
        <FeatureGroup>
          <EditControl position="topright" />
          <Circle center={[51.51, -0.06]} radius={200} />
        </FeatureGroup>
      </Map>
    </div>
  );
}
export default App;
