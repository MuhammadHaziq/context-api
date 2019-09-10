import axios from "axios";
import firebase from "../firebase/Firebase.js";

export const Serach_User = data => {
  console.log(data.search);

  var ref = firebase.database().ref("/users/");
  ref
    .orderByKey()
    .startAt("3")
    .endAt("3")
    .on("child_added", function(snapshot) {
      console.log(snapshot.key);
      console.log(snapshot);
    });
};
