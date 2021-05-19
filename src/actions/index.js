import axios from "axios";
import {
  FIND_MY_LOCATION,
  SET_DISTANCE,
  SET_ACTIVE_CATEGORY,
  FETCH_BY_CATEGORY_ERROR,
  FETCH_BY_CATEGORY_SUCCESS,
  FETCH_BY_CATEGORY_REQEST,
  SEARCH_LOCATION,
} from "../actionTypes";

export const findMyLocationAction = (latLng) => {
  return (dispatch) => {
    dispatch({ type: FIND_MY_LOCATION, payload: { myCoordinates: latLng } });
  };
};

export const setDistanceAction = (distance) => {
  return (dispatch) => {
    dispatch({ type: SET_DISTANCE, payload: { distance } });
  };
};

export const fetchByCategoryAction = (category, coordinate, distance) => {
  return (dispatch) => {
    dispatch({
      type: SET_ACTIVE_CATEGORY,
      payload: { activeCategory: category },
    });

    axios
      .get(
        `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${
          coordinate.lng
        },${coordinate.lat},${
          distance * 100
        }&limit=20&apiKey=1d376793ac4e40d7aa00db1c2018506a`
      )
      .then((response) => {
        console.log("response", response);
        dispatch({
          type: FETCH_BY_CATEGORY_SUCCESS,
          payload: {
            categoryData: response.data.features,
          },
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const submitSearchAction = (searchValue) => {
  return (dispatch) => {
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/search?text=${searchValue}&apiKey=1d376793ac4e40d7aa00db1c2018506a`
      )
      .then((response) => {
        dispatch({
          type: SEARCH_LOCATION,
          payload: {
            locations: response.data.features,
          },
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
