import { CHAT_OPEN,SEND_MESSAGE } from "./allActionTypes.js";
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
  chatDispatch({
    type: SEND_MESSAGE,
    response: data
  });
};
