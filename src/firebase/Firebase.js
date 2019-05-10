// import * as admin from "firebase-admin";
//
// var serviceAccount = require("../Secrat/react-chat-app-953be-firebase-adminsdk-t2iib-4143a0ee08.json");
//
// // Initialize Firebase
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://react-chat-app-953be.firebaseio.com/"
// });
// var db = admin.database();
//
// export default admin;
import firebase from "firebase";
var config = {
  apiKey: "AIzaSyAQmFH7MAD-mPbuG7O9EZGNOsKMbtgBUb8",
  authDomain: "react-chat-app-953be.firebaseapp.com",
  databaseURL: "https://react-chat-app-953be.firebaseio.com",
  projectId: "react-chat-app-953be",
  storageBucket: "react-chat-app-953be.appspot.com",
  messagingSenderId: "690274230486"
};
firebase.initializeApp(config);
export default firebase;
