// import { PROMOTIONS } from "../shared/promotions";
import * as ActionTypes from "./ActionTypes";

export const Promotions = (
  state = {
    isLoading: true,
    errorMessage: null,
    promos: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.PROMOS_LOADING: {
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        promos: [],
      };
    }
    case ActionTypes.ADD_PROMOS: {
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        promos: action.payload,
      };
    }
    case ActionTypes.PROMOS_FAILED: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
