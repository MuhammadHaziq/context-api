import { GET_ALL_FRIENDS, ERROR_MESSAGE } from "./allActionTypes";
import firebase from "../firebase/Firebase.js";

const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    const data = {};
    var item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};

export const get_all_friends = (dispatch, messageDispatch) => {
  const friends = firebase
    .database()
    .ref("/users")
    .on("value", snapshot => {
      console.log(snapshotToArray(snapshot).length);
      dispatch({
        type: GET_ALL_FRIENDS,
        response: snapshotToArray(snapshot)
      });
    });
  // .then(snapshot => {
  //   console.log(snapshot.val());
  //   dispatch({
  //     type: GET_ALL_FRIENDS,
  //     response: snapshot.val()
  //   });
  // })
  // .catch(err => {
  //   messageDispatch({
  //     type: ERROR_MESSAGE,
  //     response: err.message
  //   });
  //   console.log(err);
  // });
};
