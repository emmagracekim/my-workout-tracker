import { React, useState, useEffect, createContext, useContext } from "react"
import { auth } from "./emmafirebase"
import { Link, withRouter } from "react-router-dom"

const FirebaseContext = React.createContext(null)

export const withFirebase = (Component) => (props) =>
  (
    <FirebaseContext.Consumer>
      {(firebase) => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  )

export default FirebaseContext
