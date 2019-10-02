import { CHAT_OPEN, SEND_MESSAGE } from "./allActionTypes.js";
import firebase from "../firebase/Firebase.js";

export const chat_open = (data, chatDispatch) => {
  console.log(data);
  chatDispatch({
    type: CHAT_OPEN,
    response: data
  });
};

export const send_message = (data, chatDispatch) => {
  console.log(data);
  firebase
    .database()
    .ref()
    .child("friends/")
    .child(data.sender_id)
    .update([data.Reciver_id]);
  // .setValue(data.Reciver_id);
  // .child(data.sender_id)
  // .setValue([data.Reciver_id]);
  // firebase//   .database()
  //   .ref("friends/")
  //   .set({
  //     reciver: data.Reciver_id
  //     // email: email,
  //     // profile_picture : imageUrl
  //   });

  chatDispatch({
    type: SEND_MESSAGE,
    response: data
  });
};
