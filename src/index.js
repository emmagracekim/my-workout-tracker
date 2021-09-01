import { React, useEffect } from "react"
import ReactDOM from "react-dom"
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import "./Styling/calendar.css"
import App from "./App"
import Firebase from "./components/Firebase_2/emmafirebase"
import FirebaseContext from "./components/Firebase_2/firebaseContext"
import { useAuth } from "./components/Data/authProvider"
import { useHistory } from "react-router-dom"
import { Fragment } from "react"
import Login from "./pages/Login"

export default function Home() {
  const { user, loading } = useAuth()

  const { history } = useHistory()

  useEffect(() => {
    if (user) {
      history.push("/home")
    }
  }, [user])

  if (loading) return null

  return (
    <React.Fragment>
      <section>{!user && <Login />}</section>
    </React.Fragment>
  )
}

ReactDOM.render(
  <App />,

  document.getElementById("root")
)
