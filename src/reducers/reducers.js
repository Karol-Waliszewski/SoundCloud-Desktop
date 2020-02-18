import { combineReducers } from "redux";

// Reducers
import playerReducer from "./playerReducer";
import searchReducer from "./searchReducer";
import profileReducer from "./profileReducer";
import layoutReducer from "./layoutReducer";
import apiReducer from "./apiReducer";

var reducers = combineReducers({
  player: playerReducer,
  search: searchReducer,
  profile: profileReducer,
  layout: layoutReducer,
  api: apiReducer
});

export default reducers;
