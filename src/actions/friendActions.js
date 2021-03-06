import {
  GET_ALL_FRIENDS,
  REMOVE_ALL_FRIENDS,
  ERROR_MESSAGE
} from "./allActionTypes";
import firebase from "../firebase/Firebase.js";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";

const snapshotToArray = snapshot => {
  let returnArr = []

  snapshot.forEach(childSnapshot => {
    const data = {}
    console.log(childSnapshot.val())
    var item = childSnapshot.val()
    item.key = childSnapshot.key
    returnArr.push(item)
  })
  return returnArr
}
const get_friend_ids = (data, messageDispatch) => {
  // console.log(data.user_id);
  console.log(data.user_id)
  const friendKeys = firebase
    .database()
    .ref('/friends/' + data.user_id)
    .once('value')
    .then(snapshot => {
      console.log(snapshot.val())
      return snapshot.val()
    })
    .catch(err => {
      messageDispatch({
        type: ERROR_MESSAGE,
        response: err.message
      })
    })
}

export const get_all_friends = async (data, dispatch, messageDispatch) => {
  // const friend_list = await get_friend_ids(data, messageDispatch);
  // console.log(friend_list);
  $.LoadingOverlay("show");
  let returnArr = [];

  firebase
    .database()
    .ref('/friends/' + data.user_id)
    .once('value')
    .then(snapshot => {
      $.LoadingOverlay("hide");

      console.log(Object.keys(snapshot.val() || {}))
      const keys = Object.keys(snapshot.val() || {})
      // console.log(keys.map(item => item));
      keys.map(snapChild => {
        firebase
          .database()
          .ref("/users/" + snapChild)
          .on("value", snapshot => {
            var item = snapshot.val();
            item.key = snapshot.key;
            returnArr.push(item);
            $.LoadingOverlay("hide");

            dispatch({
              type: GET_ALL_FRIENDS,
              response: returnArr
            })
          })
      })
    })
    .catch(err => {
      $.LoadingOverlay("hide");

      messageDispatch({
        type: ERROR_MESSAGE,
        response: err.message
      })
    })
  // const friends
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
}

export const remove_all_friends = (dispatch, messageDispatch) => {
  dispatch({
    type: REMOVE_ALL_FRIENDS
  })
}
