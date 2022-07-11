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
    case ActionTypes.STAFFSOFDEPARTMENTS_LOADING: {
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        staffs: [],
      };
    }
    case ActionTypes.STAFFSOFDEPARTMENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    }
    case ActionTypes.ADD_STAFFSOFDEPARTMENTS: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        staffs: action.payload,
      };
    }
    case ActionTypes.ADD_STAFF: {
      return {
        ...state,
        staffs: state.staffs.concat(action.payload),
      };
    }
    case ActionTypes.DELETE_STAFF: {
      const filterStaffs = state.staffs.filter((staff) => {
        return staff.id !== action.payload;
      });
      return {
        ...state,
        isLoading: false,
        staffs: filterStaffs,
      };
    }
    default:
      return state;
  }
};
