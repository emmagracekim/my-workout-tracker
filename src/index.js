import React from "react"
import ReactDOM from "react-dom"
import "./Styling/calendar.css"
import App from "./App"
import Firebase from "./components/Firebase/emmafirebase"
import FirebaseContext from "./components/Firebase/firebaseContext"

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
)
