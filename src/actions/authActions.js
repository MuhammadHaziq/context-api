import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE
} from "./allActionTypes.js";
import firebase from "../firebase/Firebase.js";
import jwt from "jsonwebtoken";
import SetAuthorizeToken from "../utile/SetAuthorizeToken.js";

export const setCurrentUser = async (dispatch, token) => {
  const data = await jwt.decode(token);
  console.log(data);
  dispatch({
    type: LOGIN_SUCCESS,
    response: data
  });
};

export const SetCurrentUser = token => {
  const data = jwt.decode(token);
  console.log(data);
  return {
    type: LOGIN_SUCCESS,
    response: data
  };
};

// export const genrateToken = async data => {
//   const token = await jwt.sign(data, "MY_SECRET_KEY", { expiresIn: "1d" });
//   localStorage.setItem("token", token);
//   // console.log(token);
//   return token;
// };

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
        // const token = genrateToken(data);
        console.log(token);
        setCurrentUser(dispatch, token);
        localStorage.setItem("token", token);
        SetAuthorizeToken(token);

        // props.location.replace("/home");
      })
      .catch(error => {
        messageDispatch({
          type: ERROR_MESSAGE,
          response: error.message
        });
        // console.log(error.message);
      });
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
