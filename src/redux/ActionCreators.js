import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseURL";

////////////////////////////////
export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});
export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});
export const staffsFailed = (errorMessage) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errorMessage.message,
});
export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));
  return fetch(baseUrl + "staffs")
    .then(
      (response) => {
        if (response.ok) return response;
        else {
          const errorMessage = new Error(
            `Error ${response.status} : ${response.statusText}`
          );
          errorMessage.response = response;
          throw errorMessage;
        }
      },
      (err) => {
        const errorMessage = new Error(err.message);
        throw errorMessage;
      }
    )
    .then((response) => response.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((err) => dispatch(staffsFailed(err.message)));
};
////////////////////////////////
