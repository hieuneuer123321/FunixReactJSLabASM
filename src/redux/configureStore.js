import { createStore, combineReducers, applyMiddleware } from "redux";
// import { Reducer, initialState } from "./reducer";
import { Dishes } from "./dishes";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import { Comments } from "./comment";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  // const store = createStore(
  //   Reducer, // reducer
  //   initialState // our initialState
  // );
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      leaders: Leaders,
      promotions: Promotions,
      comments: Comments,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
