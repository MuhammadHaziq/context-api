import React, {useEffect, useState} from "react"
import withContext from "../../context/ContextHOC.js";
import * as ACTIONS from "../../actions/chatAction";
const Message = (props) => {
  console.log(props)
  return (
    <div>Hello</div>
  )
}
export default withContext(Message)
