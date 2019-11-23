import { CHAT_OPEN, SEND_MESSAGE, ERROR_MESSAGE } from "./allActionTypes.js";
import firebase from "../firebase/Firebase.js";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";

const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    const data = {};
    console.log(childSnapshot.val());
    var item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};

export const chat_open = (data, chatDispatch) => {
  console.log(data);
  $.LoadingOverlay("show");

  let chatKey;
  if (data.user_id < data.friend_id) {
    chatKey = data.friend_id + "-" + data.user_id;
  } else {
    chatKey = data.user_id + "-" + data.friend_id;
  }
  // if (chatKey == "") {
  //   chatKey = data.id;
  // }
  let arrayMessage = [];
  firebase
    .database()
    .ref("/chat/")
    .child(chatKey)
    .on("value", snapshot => {
      $.LoadingOverlay("hide");

      console.log(snapshotToArray(snapshot));
      if (!snapshot.exists()) {
        chatDispatch({
          type: CHAT_OPEN,
          response: [data],
          data: data
        });
      } else {
        chatDispatch({
          type: CHAT_OPEN,
          response: snapshotToArray(snapshot),
          data: data
        });
      }
    });
  // chatDispatch({
  //   type: CHAT_OPEN,
  //   response: data
  // });
};

const Check_Child_Exist = async messageDispatch => {
  $.LoadingOverlay("show");

  await firebase
    .database()
    .ref("/friends/")
    .once("value")
    .then(snapshot => {
      $.LoadingOverlay("hide");

      console.log(snapshot.exists());
      return snapshot.exists();
    })
    .catch(err => {
      $.LoadingOverlay("hide");
      messageDispatch({
        type: ERROR_MESSAGE,
        response: err.message
      });
    });
};

const Check_Child_Key_Exist = async (data, messageDispatch) => {
  $.LoadingOverlay("show");
  await firebase
    .database()
    .ref("/friends/")
    .child(data.sender_id)
    .once("value")
    .then(snapshot => {
      $.LoadingOverlay("hide");
      console.log(snapshot.val() == data.Reciver_id);
      return snapshot.val() == data.Reciver_id;
    })
    .catch(err => {
      $.LoadingOverlay("hide");
      messageDispatch({
        type: ERROR_MESSAGE,
        response: err.message
      });
    });
};

const Check_Reciver_Child_Key_Exist = async (data, messageDispatch) => {
  $.LoadingOverlay("show");
  await firebase
    .database()
    .ref("/friends/")
    .child(data.Reciver_id)
    .once("value")
    .then(snapshot => {
      $.LoadingOverlay("hide");
      console.log(snapshot.val() == data.sender_id);
      return snapshot.val() == data.sender_id;
    })
    .catch(err => {
      $.LoadingOverlay("hide");
      messageDispatch({
        type: ERROR_MESSAGE,
        response: err.message
      });
    });
};
export const chat_Function = (data, chatDispatch, messageDispatch) => {
    let chatKey;
  if (data.sender_id < data.Reciver_id) {
    chatKey = data.Reciver_id + "-" + data.sender_id;
  } else {
    chatKey = data.sender_id + "-" + data.Reciver_id;
  }
  firebase
    .database()
    .ref("/chat/")
    .child(chatKey)
    .push(data);
};

export const send_message = async (data, chatDispatch, messageDispatch) => {
  console.log("data", data);

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
      .set({ status: "pending" });

    //  Reciver Child
    firebase
      .database()
      .ref()
      .child("friends/")
      .child(data.Reciver_id)
      .child(data.sender_id)
      .set({ status: "pending" });
  } else {
    console.log("else");
    const dataExist = await Check_Child_Key_Exist(data, messageDispatch);
    if (dataExist !== false) {
      //  Add New Friend
      firebase
        .database()
        .ref(`friends/${data.sender_id}`)
        .child(data.Reciver_id)
        .set({ status: "pending" });
      // chat_Function(data, chatDispatch, messageDispatch);
    }
    const reciverExist = await Check_Reciver_Child_Key_Exist(
      data,
      messageDispatch
    );
    if (reciverExist !== false) {
      //  Add New Friend
      firebase
        .database()
        .ref(`friends/${data.Reciver_id}`)
        .child(data.sender_id)
        .set({ status: "pending" });
      // chat_Function(data, chatDispatch, messageDispatch);
    }
  }
  chat_Function(data, chatDispatch, messageDispatch);
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
