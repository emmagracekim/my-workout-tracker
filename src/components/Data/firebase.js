import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBnZZ9R3F4ThtNKGFGML3oIle7Ed3aXhBs",
  authDomain: "workout-tracker-887b0.firebaseapp.com",
  databaseURL: "https://workout-tracker-887b0-default-rtdb.firebaseio.com",
  projectId: "workout-tracker-887b0",
  storageBucket: "workout-tracker-887b0.appspot.com",
  messagingSenderId: "30631146252",
  appId: "1:30631146252:web:d7807ca7a31338163b8f29",
  measurementId: "G-KTZ3DNSB5C",
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
}

export { auth, db, uiConfig }
