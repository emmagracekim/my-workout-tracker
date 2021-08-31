import { React, useEffect } from "react"
import { Router, Switch, Route, Link, Redirect } from "react-router-dom"

import { ThemeProvider } from "@material-ui/core/styles"
import theme from "./config/theme.config"

import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./components/Dashboard"
import {
  AuthUserContext,
  withAuthentication,
} from "./components/Firebase_2/withAuthentication"
import { withFirebase } from "./components/Firebase_2/firebaseContext"
import CreateWorkout from "./components/CreateWorkout"
import Home from "./pages/Home"
import { AuthProvider, useAuth } from "./components/Data/authProvider"
import history from "./history"
import Login from "./pages/Login"
import Profile from "./pages/Profile"

function App() {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!user) {
      ;<Redirect to="/" />
    }
  }, [user])

  return (
    <AuthProvider>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  )
}

export default App
