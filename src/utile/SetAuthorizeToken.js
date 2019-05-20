import axios from "axios";

const SetAuthorizeToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorize"] = `Bearar ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorize"];
  }
};
export default SetAuthorizeToken;
