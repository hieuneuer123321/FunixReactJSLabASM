import { combineReducers, createStore, applyMiddleware } from "redux";
import { Departments } from "./departmentsReducer";
import { Staffs } from "./staffsReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const configureStrore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      salary: [],
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
