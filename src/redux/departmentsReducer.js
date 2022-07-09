// import { DEPARTMENTS } from "../shared/staffs";
import * as ActionTypes from "./ActionTypes";

export const Departments = (
  state = {
    isLoading: true,
    errorMessage: null,
    departments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DEPARTMENTS: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        departments: action.payload,
      };
    }
    case ActionTypes.DEPARTMENTS_LOADING: {
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        departments: [],
      };
    }
    case ActionTypes.DEPARTMENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        departments: [],
      };
    }
    default:
      return state;
  }
};
