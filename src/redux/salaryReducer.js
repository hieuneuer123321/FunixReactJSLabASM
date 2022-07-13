import * as ActionTypes from "./ActionTypes";

export const Salary = (
  state = {
    isLoading: true,
    errorMessage: null,
    salary: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SALARY_LOADING: {
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        salary: [],
      };
    }
    case ActionTypes.ADD_SALARY: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        salary: action.payload,
      };
    }
    case ActionTypes.SALARY_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        salary: [],
      };
    }
    default:
      return state;
  }
};
