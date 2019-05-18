import { SET_USER } from "./types";
import axios from "axios";
import { apiURL } from "./../config";

export const setUser = user => ({
  user,
  type: SET_USER
});

export const login = (user, password, errCallback) => {
  return dispatch => {
    return axios
      .get(`${apiURL}`)
      .then(res => {
        dispatch(setUser(res.data.username));
      })
      .catch(err => {
        const message =
          err.data && err.data.error ? err.data.error : "Error reaching server";
        errCallback(errors => ({ ...errors, message }));
      });
  };
};

export const signup = (username, email, password, errCallback) => {
  console.log(username, email, password);
  return dispatch => {
    return axios
      .post(`${apiURL}/user`,{ username, email, password })
      .then(res => {
        console.log(res);
        console.log(res.data);
        dispatch(setUser(res.data.username));
      })
      .catch(err => {
        console.log(err);
        const message = "Error reaching server";
        errCallback(errors => ({ ...errors, message }));
      });
  };
};
