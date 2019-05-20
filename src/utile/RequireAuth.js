import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import withContext from "../context/ContextHOC.js";
export default ComposedComponent => {
  const Authenticate = props => {
    useLayoutEffect(() => {
      if (!props.context.auth) {
        props.history.replace("/login");
      }
      console.log("I am about to render!");
    }, []);
    console.log(props.context.auth);
    //      static getDerivedStateFromProps(props, state){
    //        console.log(state)
    //       if(!props.context.auth){
    //         props.history.replace("/login");
    //       }
    //     }
    //     getSnapshotBeforeUpdate(prevProps, prevState) {
    //       if (prevProps.context.auth !== props.context.auth) {
    //           return true
    //       }
    //           return null;
    //     }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //    if (snapshot !== null) {
    //       props.history.replace("/login")
    //     }
    //   }

    return <ComposedComponent {...props} />;
  };

  Authenticate.propTypes = {
    auth: PropTypes.bool.isRequired,
    messages: PropTypes.func.isRequired
  };

  // const mapStateToProps = state => {
  //   return {
  //     auth: state.AuthReducer.auth
  //   };
  // };
  return withContext(Authenticate);
  // return connect(
  //   mapStateToProps,
  //   { messages }
  // )(Authenticate);
};
