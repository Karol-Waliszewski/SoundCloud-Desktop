import { combineReducers } from "redux";

// Reducers
import playerReducer from "./playerReducer";
import searchReducer from "./searchReducer";

var reducers = combineReducers({
  player: playerReducer,
  search: searchReducer
});

export default reducers;
