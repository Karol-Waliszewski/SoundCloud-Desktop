import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import createReducers from "./reducers/reducers";

// History
export const history = createBrowserHistory();

// Logger
const logger = createLogger({
  collapsed: true,
  diff: true
});

// Middlewares
const middlewares = compose(
  applyMiddleware(routerMiddleware(history), thunk, logger)
);

// Creating a store
let store = createStore(createReducers(history), middlewares);

// Exports
export const { dispatch, getState } = store;
export default store;
