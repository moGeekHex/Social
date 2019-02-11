import * as firebase from 'firebase';

  const config = {
    apiKey: "AIzaSyCBCjBpHHOvf53GIx4DgmQEXEM4vKfCTs0",
    authDomain: "auth-c58fc.firebaseapp.com",
    databaseURL: "https://auth-c58fc.firebaseio.com",
    projectId: "auth-c58fc",
    storageBucket: "auth-c58fc.appspot.com",
    messagingSenderId: "21399229979"
  };
  firebase.initializeApp(config);

  export default firebase;