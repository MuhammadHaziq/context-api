import React from "react";

const INITAIL_STATE = {
  friendList: []
};
const FriendContext = React.createContext(INITAIL_STATE);

export default FriendContext;
