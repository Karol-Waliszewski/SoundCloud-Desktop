import { combineReducers } from "redux";

// Reducers
import { connectRouter } from "connected-react-router";
import playerReducer from "./playerReducer";
import searchReducer from "./searchReducer";
import profileReducer from "./profileReducer";
import layoutReducer from "./layoutReducer";
import apiReducer from "./apiReducer";

var createReducers = history =>
  combineReducers({
    router: connectRouter(history),
    player: playerReducer,
    search: searchReducer,
    profile: profileReducer,
    layout: layoutReducer,
    api: apiReducer
  });

export default createReducers;
