import React, { useEffect, useRef, useState } from "react";
import {
  TileLayer,
  Map,
  Marker,
  Popup,
  FeatureGroup,
  Circle,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import InputSearch from "./components/input";
import MyDrawer from "./components/drawer";
import myPin from "./assets/pin.png";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import "./reset.css";
import "./style.scss";

function App() {
  const mapRef = useRef();
  const positionBelgrade = { lat: 44.8178131, lng: 20.4568974 };
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(null);
  const [positions, setPositions] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [coord, setCoord] = useState(null);
  const [categories, setCategories] = useState([]);
  const [distance, setDistance] = useState(0);
  const [activCategory, setActivCategory] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/search?text=${search}&apiKey=1d376793ac4e40d7aa00db1c2018506a`
      )
      .then((response) => {
        setPositions(response.data.features);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const getCategories = (categories) => {
    setActivCategory(categories);
    axios
      .get(
        `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${
          coord.lon
        },${coord.lat},${
          distance * 100
        }&limit=20&apiKey=1d376793ac4e40d7aa00db1c2018506a`
      )
      .then((response) => {
        setCategories(response.data.features);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/search?text=${event.target.value}&apiKey=1d376793ac4e40d7aa00db1c2018506a`
      )
      .then((response) => {
        setPositions(response.data.features);
        setSearchOpen(true);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleChangeDistance = (event, newValue, data) => {
    setDistance(newValue);
    getCategories(activCategory);
    console.log(activCategory);
  };

  const clickFlyTo = (data) => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;
    const latLngCoordinates = {
      lat: "",
      lon: "",
    };

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
    marker.addTo(map);
    marker.bindPopup("This is my Location").openPopup();
  }

  return (
    <div className="App">
      <MyDrawer
        open={open}
        getCategorie={getCategories}
        distance={distance}
        handleChangeDistance={handleChangeDistance}
        selectedLocation={coord}
      />
      <InputSearch
        handleClick={handleClick}
        onSubmit={onSubmit}
        positions={positions}
        clickFlyTo={clickFlyTo}
        handleSearch={handleSearch}
      />
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
        {categories
          ? categories.map((coordinates, index) => {
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
        {positions
          ? positions.map((coordinates, index) => {
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
          <EditControl
            position="topright"
            // onEdited={this._onEditPath}
            // onCreated={this._onCreate}
            // onDeleted={this._onDeleted}
          />
          <Circle center={[51.51, -0.06]} radius={200} />
        </FeatureGroup>
      </Map>
    </div>
  );
}
export default App;
