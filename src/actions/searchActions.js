import { SEARCH_RESULT, CLEAR_SEARCH_RESULT } from "./allActionTypes.js";
import axios from "axios";
import firebase from "../firebase/Firebase.js";

export const Serach_User = (data, dispatch) => {
  let searchArr = [];
  var ref = firebase.database().ref("/users/");

  ref
    .orderByChild("email")
    .startAt(data.search)
    // .equalTo(data.search)
    .on("child_added", function(snapshot) {
      console.log(snapshot.val());
      let data = snapshot.val();
      data.key = snapshot.key;
      console.log(data);
      searchArr.push(data);
      dispatch({
        type: SEARCH_RESULT,
        response: searchArr
      });
    });
};
// .once("value")
// .then(snapshot => {
//   console.log(snapshot.val());
// });
