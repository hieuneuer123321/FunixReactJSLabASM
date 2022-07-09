// import { STAFFS } from "../shared/staffs";
import * as ActionTypes from "./ActionTypes";

export const Staffs = (
  state = {
    isLoading: true,
    errorMessage: null,
    staffs: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.STAFFS_LOADING: {
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    }
    case ActionTypes.ADD_STAFFS: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        staffs: action.payload,
      };
    }
    case ActionTypes.STAFFS_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        staffs: [],
      };
    }
    default:
      return state;
  }
};
