import React from "react";

const INITAIL_STATE = {
  show: false,
  search: [],
  email: ""
};

const SearchContext = React.createContext({ INITAIL_STATE });

export default SearchContext;
