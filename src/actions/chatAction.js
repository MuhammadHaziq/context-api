import { CHAT_OPEN } from "./allActionTypes.js";
import firebase from "../firebase/Firebase.js";

export const chat_open = (data, chatDispatch) => {
  console.log(data);
  chatDispatch({
    type: CHAT_OPEN,
    response: data
  });
};
