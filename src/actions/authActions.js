import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  LOGOUT_SUCCESS,
  UPDATE_USER_PROFILE
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

export const setCurrentSignUpUser = async (dispatch, token) => {
  const data = await jwt.decode(token);
  dispatch({
    type: SIGNUP_SUCCESS,
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

export const signup = async (dispatch, email, password, messageDispatch) => {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const data = {
          id: response.user.uid,
          email: response.user.email
        };
        const token = jwt.sign(data, "MY_SECRET_KEY", { expiresIn: "1d" });
        setCurrentSignUpUser(dispatch, token);
        localStorage.setItem("token", token);
        SetAuthorizeToken(token);
        // return { status: true, response: response.message };
        // console.log(response);
      })
      .catch(error => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        messageDispatch({
          type: ERROR_MESSAGE,
          response: error.message
        });
        // return { status: false, response: error.message };

        // ...
      });
  } catch (err) {
    messageDispatch({
      type: ERROR_MESSAGE,
      response: err.message
    });
  }
};

export const Logout = async (dispatch, messageDispatch) => {
  console.log(dispatch, messageDispatch);
  try {
    const res = await firebase
      .auth()
      .signOut()
      .then(response => {
        localStorage.removeItem("token");
        dispatch({
          type: LOGOUT_SUCCESS
        });
      })
      .catch(err => {
        messageDispatch({
          type: ERROR_MESSAGE,
          response: err.message
        });
      });
  } catch (err) {
    messageDispatch({
      type: ERROR_MESSAGE,
      response: err.message
    });
  }
};

export const updateFunctionProfile = (
  data,
  dispatch,
  messageDispatch,
  value
) => {
  console.log(data);
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: data.name,
      phoneNumber: data.phoneNumber
    })
    .then(response => {
      // Update successful.
      //  Search Data Exist or not
      if (value == "exist") {
        firebase
          .database()
          .ref("users/" + user.uid)
          .set({
            username: data.name,
            email: data.email,
            profile_picture: "",
            phoneNumber: data.phoneNumber,
            dateofbirth: data.dateofbirth
          })
          .then(response => {
            messageDispatch({
              type: SUCCESS_MESSAGE,
              response: "Profile Update SuccessFully"
            });
          })
          .catch(err => {
            messageDispatch({
              type: ERROR_MESSAGE,
              response: err.message
            });
          });
      } else {
        firebase
          .database()
          .ref("users/" + user.uid)
          .update({
            username: data.name,
            email: data.email,
            profile_picture: "",
            phoneNumber: data.phoneNumber,
            dateofbirth: data.dateofbirth
          })
          .then(response => {
            messageDispatch({
              type: SUCCESS_MESSAGE,
              response: "Profile Update SuccessFully"
            });
          })
          .catch(err => {
            messageDispatch({
              type: ERROR_MESSAGE,
              response: err.message
            });
          });
      }

      // console.log(response);
      // dispatch({ type: UPDATE_USER_PROFILE;
    })
    .catch(err => {
      messageDispatch({
        type: ERROR_MESSAGE,
        response: err.message
      });
    });
  // ...
};
export const updateProfile = (data, dispatch, messageDispatch) => {
  try {
    const user = firebase.auth().currentUser;
    // console.log(user);
    firebase
      .database()
      .ref("/users/" + user.uid)
      .once("value")
      .then(snapshot => {
        if (snapshot.val() === null) {
          const value = "not exist";
          updateFunctionProfile(data, dispatch, messageDispatch, value);
        } else {
          const value = "exist";
          updateFunctionProfile(data, dispatch, messageDispatch, value);
        }
        console.log(snapshot.val());
      });
  } catch (err) {
    messageDispatch({
      type: ERROR_MESSAGE,
      response: err.message
    });
  }
};
