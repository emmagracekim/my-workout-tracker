import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAR5JXTrQx_W0m5kaYvW7YTIbwATmU3GEA",
  authDomain: "fit4life-f0372.firebaseapp.com",
  projectId: "fit4life-f0372",
  storageBucket: "fit4life-f0372.appspot.com",
  messagingSenderId: "640580392358",
  appId: "1:640580392358:web:791f6f42e3ae7f8637eb67",
  measurementId: "G-C5YSK4Q453",
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
