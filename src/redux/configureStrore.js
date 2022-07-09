import { combineReducers, createStore, applyMiddleware } from "redux";
import { Departments } from "./departmentsReducer";
import { Staffs } from "./staffsReducer";
import { Salary } from "./salaryReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const configureStrore = () => {
  const store = createStore(
    combineReducers({
      staffs: Staffs,
      departments: Departments,
      salary: Salary,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
