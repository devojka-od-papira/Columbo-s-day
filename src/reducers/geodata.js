/* eslint-disable import/no-anonymous-default-export */
import {
  FIND_MY_LOCATION,
  SET_DISTANCE,
  SET_ACTIVE_CATEGORY,
  FETCH_BY_CATEGORY_REQEST,
  FETCH_BY_CATEGORY_SUCCESS,
  FETCH_BY_CATEGORY_ERROR,
  SEARCH_LOCATION,
} from "../actionTypes";

const initalState = {
  myCoordinates: null,
  distance: 0,
  activeCategory: null,
  fetchingCategry: false,
  categoryData: [],
  fetchingCategryError: false,
  locations: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case FIND_MY_LOCATION:
      return {
        ...state,
        myCoordinates: action.payload.myCoordinates,
      };
    case SET_DISTANCE:
      return {
        ...state,
        distance: action.payload.distance,
      };
    case SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload.activeCategory,
      };
    case FETCH_BY_CATEGORY_REQEST:
      return {
        ...state,
      };
    case FETCH_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryData: action.payload.categoryData,
      };
    case FETCH_BY_CATEGORY_ERROR:
      return {
        ...state,
      };
    case SEARCH_LOCATION:
      return {
        ...state,
        locations: action.payload.locations,
      };
    default:
      return state;
  }
};
