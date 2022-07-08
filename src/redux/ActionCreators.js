import * as ActionTypes from "./ActionTypes";
// import { DISHES } from "../shared/dishes";
import { baseUrl } from "../shared/baseUrl";

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  };
  newComment.date = new Date().toISOString();
  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) return response;
        else {
          let error = new Error(
            `Error ${response.status} : ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (err) => {
        let errMessage = new Error(err.message);
        throw errMessage;
      }
    )
    .then((response) => response.json())
    .then((dataComment) => dispatch(addComment(dataComment)))
    .catch((err) => {
      dispatch(commentsFailed(err.message));
    });
};
////////////////////////////////
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));
  // setTimeout(() => {
  //   dispatch(addDishes(DISHES));
  // }, 3000);
  return fetch(baseUrl + "dishes")
    .then(
      (response) => {
        if (response.ok) return response;
        else {
          let error = new Error(
            `Error ${response.status} : ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (err) => {
        let errMessage = new Error(err.message);
        throw errMessage;
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((dishes) => {
      dispatch(addDishes(dishes));
    })
    .catch((err) => {
      dispatch(dishesFailed(err.message));
    });
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errorMessage) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errorMessage,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

///////////////////////
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) return response;
        else {
          let error = new Error(
            `Error ${response.status} : ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (err) => {
        let errMessage = new Error(err.message);
        throw errMessage;
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((comments) => {
      dispatch(addComments(comments));
    })
    .catch((err) => {
      alert("Post Comment Failed", err.message);
    });
};
export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});
export const commentsFailed = (errorMessage) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errorMessage,
});
///////////////////////////////////
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));
  return fetch(baseUrl + "promotions")
    .then(
      (response) => {
        if (response.ok) return response;
        else {
          let error = new Error(
            `Error ${response.status} : ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (err) => {
        let errMessage = new Error(err.message);
        throw errMessage;
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((promotions) => {
      dispatch(addPromos(promotions));
    })
    .catch((err) => {
      dispatch(promosFailed(err.message));
    });
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errorMessage) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errorMessage,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});
