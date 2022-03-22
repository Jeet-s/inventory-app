import { ADD_LOCATION } from "./actionTypes";

export const addLocation = function (location) {
  return {
    type: ADD_LOCATION,
    location,
  };
};
