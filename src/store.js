import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers/reducers";

// Logger
let logger = createLogger({
  collapsed: true,
  diff: true
});

// Middlewares
const middlewares = applyMiddleware(thunk, logger);

// Creating a store
let store = createStore(reducers, middlewares);

// Exports
export const { dispatch, getState } = store;
export default store;
