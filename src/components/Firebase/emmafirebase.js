import firebase from "firebase/app"
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

/*** Authentication  ***/
// const doCreateUserWithEmailAndPassword = (email, password) =>
//   auth.createUserWithEmailAndPassword(email, password)

// doSignInWithEmailAndPassword = (email, password) =>
//   this.auth.signInWithEmailAndPassword(email, password)

// doSignOut = () => this.auth.signOut()

// doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email)

// // database
// user = (uid) => this.db.ref(`users/${uid}`)
// users = () => this.db.ref("users")

// addActivity = (uid, activity) => {
//   const ref = this.db.ref().child(`users/${uid}/activities`)
//   ref.push(activity)
// }

// updateActivity = (uid, activity, activityKey) => {
//   const ref = this.db.ref().child(`users/${uid}/activities/${activityKey}`)
//   ref.update(activity)
// }

export { auth, db }
