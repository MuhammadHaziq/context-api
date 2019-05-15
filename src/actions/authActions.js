import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE
} from "./allActionTypes.js";
import firebase from "../firebase/Firebase.js";
import jwt from "jsonwebtoken";
// import fs from "fs";
// var firebase = admin.database();
// const privateKey = fs.readFileSync("private.key");
export const Login = async (dispatch, email, password, messageDispatch) => {
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        const data = {
          id: response.user.uid,
          email: response.user.email
        };
        const token = jwt.sign(data, "MY_SECRET_KEY", { expiresIn: "1d" });
        localStorage.setValue("token", token);
        // console.log(data);
        // console.log(response);
        // console.log(response);
        // return true;
        return { status: true, response: response.message };
      })
      .catch(error => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        console.log(error.message);
        return { status: false, response: error.message };
        // return false;
        // ...
      });
    if (res.status === true) {
      // console.log(res.response);
      dispatch({
        type: LOGIN_SUCCESS
      });
    } else {
      messageDispatch({
        type: ERROR_MESSAGE,
        response: res.response
      });
      // console.log(res.response);
    }
  } catch (err) {
    console.log(err);
  }
};

export const signup = async (dispatch, email, password) => {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        return { status: true, response: response.message };
        // console.log(response);
      })
      .catch(error => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        return { status: false, response: error.message };

        // ...
      });
    if (res.status === true) {
      dispatch({ type: SIGNUP_SUCCESS });
    } else {
      dispatch({ type: SIGNUP_FAIL });
    }
  } catch (err) {
    console.log(err.message);
  }
};
