// import { COMMENTS } from "../shared/comments";
import * as ActionTypes from "./ActionTypes";

export const Comments = (
  state = { errorMessage: null, comments: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT: {
      const comment = action.payload;
      comment.id = state.comments.length;
      comment.date = new Date().toISOString();
      return {
        ...state,
        comments: state.comments.concat(comment),
      };
    }
    case ActionTypes.ADD_COMMENTS: {
      return {
        ...state,
        errorMessage: null,
        comments: action.payload,
      };
    }
    case ActionTypes.COMMENTS_FAILED: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
