import { combineReducers } from "redux";
import playerReducer from "./playerReducer.js";

var reducers = combineReducers({
  player: playerReducer
});

export default reducers;
