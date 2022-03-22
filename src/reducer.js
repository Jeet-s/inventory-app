import { ADD_LOCATION } from "./actionTypes";

const initialState = {
  locations: [],
};

export default function (state = initialState, action) {
  if ((action.type = ADD_LOCATION && action.location)) {
    state.locations = [...state.locations, action.location];
  }

  return state;
}
