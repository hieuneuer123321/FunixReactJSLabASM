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
export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});
export const departmentsLoading = () => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
});
export const departmentsFailed = (errorMessage) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errorMessage,
});
export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading(true));
  return fetch(baseUrl + "departments")
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
    .then((response) => {
      return response.json();
    })
    .then((departments) => {
      return dispatch(addDepartments(departments));
    })
    .catch((err) => {
      return dispatch(departmentsFailed(err.message));
    });
};
////////////////////////////////
export const salaryLoading = () => ({
  type: ActionTypes.SALARY_LOADING,
});
export const addSalary = (salary) => ({
  type: ActionTypes.ADD_SALARY,
  payload: salary,
});
export const salaryFailed = (errorMessage) => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errorMessage,
});
export const fetchSalary = () => (dispatch) => {
  dispatch(salaryLoading(true));
  return fetch(baseUrl + "staffsSalary")
    .then(
      (response) => {
        if (response.ok) return response;
        else {
          const errorMessage = new Error(
            `Error ${response.status} : ${response.statusText}`
          );
          throw errorMessage;
        }
      },
      (err) => {
        const errorMessage = new Error(err.message);
        throw errorMessage;
      }
    )
    .then((response) => response.json())
    .then((salary) => {
      return dispatch(addSalary(salary));
    })
    .catch((err) => {
      return dispatch(salaryFailed(err.message));
    });
};
////////////////////////////////
export const staffsOfDepartmentLoading = () => ({
  type: ActionTypes.STAFFSOFDEPARTMENTS_LOADING,
});
export const addStaffsOfDepartment = (staffSOfDepartment) => ({
  type: ActionTypes.ADD_STAFFSOFDEPARTMENTS,
  payload: staffSOfDepartment,
});
export const staffsOfDepartmentFailed = (errorMessage) => ({
  type: ActionTypes.STAFFSOFDEPARTMENTS_FAILED,
  payload: errorMessage,
});
export const fetchStaffsOfDepartment = (departmentId) => (dispatch) => {
  console.log(departmentId);
  dispatch(staffsOfDepartmentLoading(true));
  return fetch(baseUrl + "departments/" + departmentId)
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
    .then((data) => {
      console.log(data);
      return dispatch(addStaffsOfDepartment(data));
    })
    .catch((err) => dispatch(staffsOfDepartmentFailed(err.message)));
};
////////////////////////////////
export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});
export const postAddStaff =
  (
    name,
    doB,
    salaryScale,
    departmentId,
    startDate,
    annualLeave,
    overTime,
    image = "/assets/images/alberto.png",
    salary = 3000
  ) =>
  (dispatch) => {
    const newStaff = {
      name: name,
      doB: doB,
      salaryScale: salaryScale,
      startDate: startDate,
      departmentId: departmentId,
      annualLeave: annualLeave,
      overTime: overTime,
      image: image,
      salary: salary,
    };
    return fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(newStaff),
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) return response;
          else {
            const errorMessage = new Error(
              `Error ${response.status} : ${response.statusText}`
            );
            throw errorMessage;
          }
        },
        (errorMessage) => {
          const error = new Error(errorMessage.message);
          throw error;
        }
      )
      .then((response) => response.json())
      .then((data) => {
        console.log(newStaff);
        console.log(data);
        return dispatch(addStaff(data));
      })
      .catch((error) => dispatch(staffsFailed(error.message)));
  };
////////////////////////////////

export const deleteStaffSucceeded = (staff) => ({
  type: ActionTypes.DELETE_STAFF,
  payload: staff,
});
export const deleteStaff = (id) => (dispatch) => {
  return fetch(baseUrl + "staffs/" + id, {
    method: "DELETE",
  })
    .then(
      (response) => {
        if (response.ok) return response;
        else {
          const errorMessage = new Error(
            `Error ${response.status} : ${response.statusText}`
          );
          throw errorMessage;
        }
      },
      (err) => {
        const errorMessage = new Error(err.message);
        throw errorMessage;
      }
    )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return dispatch(deleteStaffSucceeded(data));
    })
    .catch((err) => dispatch(staffsFailed(err.message)));
};
////////////////////////////////
export const updateStaffSucceeded = (staff) => ({
  type: ActionTypes.UPDATE_STAFF,
  payload: staff,
});
export const updateStaff = (id) => (dispatch) => {
  return fetch(baseUrl + "staffs/" + id, {
    method: "PATCH",
  });
};
