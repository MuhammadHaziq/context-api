import { CLOSE_MESSAGE } from "./allActionTypes.js";

export const closeSnackeBar = dispatch => {
  dispatch({ type: CLOSE_MESSAGE });
};
