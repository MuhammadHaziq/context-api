import React from "react";

const INITAIL_STATE = {
  show: false,
  message: [],
  email: ""
};

const ChatContext = React.createContext({ INITAIL_STATE });

export default ChatContext;
