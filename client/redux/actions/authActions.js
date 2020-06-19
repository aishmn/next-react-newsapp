import { LOAD_USER, SIGNUP, SIGNIN, SIGNOUT } from "../store/types";
import api from "../../lib/api";
import setAuthToken from "../../lib/setAuthToken";
import { setNotification } from "./notificationActions";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/users/me");

    dispatch({
      type: LOAD_USER,
      payload: res.data.data.data,
    });
  } catch (err) {
    console.log(err.response);
    if (err.response.data.message) {
      dispatch(setNotification(err.response.data.message));
    }
  }
};

export const signIn = (data) => async (dispatch) => {
  const body = JSON.stringify(data);

  try {
    const res = await api.post("/users/login", body);
    dispatch({
      type: SIGNIN,
      payload: res.data,
    });
    console.log(res.data);
    setAuthToken(res.data.token);
  } catch (err) {
    console.log(err.response);
    if (err.response.data.message) {
      dispatch(setNotification(err.response.data.message));
    }
  }
};
export const signUp = ({ email, password, passwordConfirm, name }) => async (
  dispatch
) => {
  const body = { email, password, passwordConfirm, name };
  try {
    const res = await api.post("/users/signup", body);
    dispatch({
      type: SIGNUP,
      payload: res.data.data.user,
    });
    setAuthToken(res.data.token);
    dispatch(setNotification("Succesfully signed up"));
  } catch (err) {
    if (err.response.data.message) {
      dispatch(setNotification(err.response.data.message));
    }
  }
};
export const signOut = () => async (dispatch) => {
  await api.get("/users/logout");
  dispatch({ type: SIGNOUT });
};
