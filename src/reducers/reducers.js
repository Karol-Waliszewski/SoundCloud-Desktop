import { combineReducers } from "redux";

// Reducers
import playerReducer from "./playerReducer";
import searchReducer from "./searchReducer";
import profileReducer from "./profileReducer";

var reducers = combineReducers({
  player: playerReducer,
  search: searchReducer,
  profile: profileReducer
});

export default reducers;
