import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers/reducers";

const middlewares = applyMiddleware(thunk, logger);

let store = createStore(reducers, middlewares);

export default store;
