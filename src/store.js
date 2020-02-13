import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers/reducers";

// Middlewares
const middlewares = applyMiddleware(thunk, logger);

// Creating a store
let store = createStore(reducers, middlewares);

// // Checks if queue has been shuffled
// let shuffleChange = () => {
//   let previousState = store.getState().player.shuffle;
//   return () => {
//     let currentState = store.getState().player.shuffle;
//     if (previousState !== currentState) {
//       // TODO: on shuffle change
//     }
//     previousState = currentState;
//   };
// };

// // Subscribtions
// store.subscribe(shuffleChange());

export default store;
