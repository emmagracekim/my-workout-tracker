import React from "react"
import ReactDOM from "react-dom"
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import "./Styling/calendar.css"
import App from "./App"
import Firebase from "./components/Firebase_2/emmafirebase"
import FirebaseContext from "./components/Firebase_2/firebaseContext"

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
)
