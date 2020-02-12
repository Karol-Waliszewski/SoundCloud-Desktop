import { combineReducers } from "redux";

// Reducers
import playerReducer from "./playerReducer";
import searchReducer from "./searchReducer";
import profileReducer from "./profileReducer";
import layoutReducer from "./layoutReducer";

var reducers = combineReducers({
  player: playerReducer,
  search: searchReducer,
  profile: profileReducer,
  layout: layoutReducer
});

export default reducers;
