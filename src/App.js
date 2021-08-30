import React from "react"
import { Router, Switch, Route, Link } from "react-router-dom"

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
import { useAuth } from "./components/Data/authProvider"
import history from "./history"
import Login from "./components/Login"

function App(props, { Component, pageProps }) {
  const { user, loading } = useAuth()

  return (
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
          {/* <Route path="/create-workout"> */}
          {/* <AuthUserContext.Consumer>
              {(authUser) =>
                authUser ? (
                  <CreateWorkout
                    firebase={props.firebase}
                    authUser={authUser}
                  />
                ) : (
                  <p>Not authorized</p>
                )
              }
            </AuthUserContext.Consumer> */}
          {/* </Route> */}
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default withAuthentication(App)
