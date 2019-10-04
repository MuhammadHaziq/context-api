import { CHAT_OPEN, SEND_MESSAGE, ERROR_MESSAGE } from "./allActionTypes.js";
import firebase from "../firebase/Firebase.js";

export const chat_open = (data, chatDispatch) => {
  console.log(data);
  chatDispatch({
    type: CHAT_OPEN,
    response: data
  });
};

const Check_Child_Exist = async messageDispatch => {
  await firebase
    .database()
    .ref("/friends/")
    .once("value")
    .then(snapshot => {
      console.log(snapshot.exists());
      return snapshot.exists();
    })
    .catch(err => {
      messageDispatch({
        type: ERROR_MESSAGE,
        response: err.message
      });
    });
};

const Check_Child_Key_Exist = async (data, messageDispatch) => {
  await firebase
    .database()
    .ref("/friends/")
    .child(data.sender_id)
    .once("value")
    .then(snapshot => {
      console.log(snapshot.val() == data.Reciver_id);
      return snapshot.val() == data.Reciver_id;
    })
    .catch(err => {
      messageDispatch({
        type: ERROR_MESSAGE,
        response: err.message
      });
    });
};
export const chat_Function = (data, chatDispatch, messageDispatch) => {
  let chatKey;
  if (data.sender_id < data.Reciver_id) {
    chatKey = data.Reciver_id + data.sender_id;
  } else {
    chatKey = data.sender_id + data.Reciver_id;
  }
  firebase
    .database()
    .ref("/chat/")
    .child(chatKey)
    .push(data);
};

export const send_message = async (data, chatDispatch, messageDispatch) => {
  const childExist = await Check_Child_Exist(messageDispatch);
  if (childExist == false) {
    console.log("if");
    // Add new Node With child
    firebase
      .database()
      .ref()
      .child("friends/")
      .child(data.sender_id)
      .child(data.Reciver_id)
      .set(true);
  } else {
    console.log("else");
    const dataExist = await Check_Child_Key_Exist(data, messageDispatch);
    if (dataExist == false) {
    } else {
      //  Add New Friend
      firebase
        .database()
        .ref(`friends/${data.sender_id}`)
        .child(data.Reciver_id)
        .set(true);
    }
  }

  // .update([data.Reciver_id]);
  // .setValue(data.Reciver_id);
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
