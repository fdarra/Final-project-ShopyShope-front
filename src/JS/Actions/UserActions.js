import axios from "axios";
import { ADD_USER_FAIL, ADD_USER_LOAD, ADD_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_LOAD, DELETE_USER_SUCCESS, EDIT_USER_FAIL, EDIT_USER_LOAD, EDIT_USER_SUCCESS, GET_USER_BY_ID_FAIL, GET_USER_BY_ID_LOAD, GET_USER_BY_ID_SUCCESS, GET_USERS_FAIL, GET_USERS_LOAD, GET_USERS_SUCCESS } from "../Actiontypes/UserActionTypes";

// get user action
export const getUsers = () => async (dispatch) => {
    dispatch({ type: GET_USERS_LOAD });
    try {
        const result = await axios.get('/api/users/getUsers')
        dispatch({ type: GET_USERS_SUCCESS, payload: result.data });
    } catch (error) {
        dispatch({ type: GET_USERS_FAIL, payload: error });
    }
}

// get user by id action
export const getUserById = (id) => async (dispatch) => {
  dispatch({ type: GET_USER_BY_ID_LOAD });
  try {
    const result = await axios.get(`/api/users/getUserById/${id}`);
    dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: GET_USER_BY_ID_FAIL, payload: error });
  }
};

// delete user by id action
export const deleteUser = ({id}) => async (dispatch) => {
  dispatch({ type: DELETE_USER_LOAD });
  try {
    const result = await axios.delete(`/api/users/deleteUser/${id}`);
    dispatch({ type:  DELETE_USER_SUCCESS, payload: result.data });

  } catch (error) {
    dispatch({ type:  DELETE_USER_FAIL, payload: error });
  }
};

// add user action
export const addUser = ({newUser}) => async (dispatch) => {
  dispatch({ type: ADD_USER_LOAD });
  try {
    const result = await axios.post("/api/users/adduser", newUser);
    dispatch({ type:ADD_USER_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: ADD_USER_FAIL, payload: error });
  }
};

// edit user action
export const editeUser = ({id, newUser}) => async (dispatch) => {
  dispatch({ type: EDIT_USER_LOAD });
  try {
    const result = await axios.put(`/api/users/editeUser/${id}`, newUser);
    dispatch({ type: EDIT_USER_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: EDIT_USER_FAIL, payload: error });
  }
};