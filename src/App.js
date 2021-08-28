import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

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

function App(props, { Component, pageProps }) {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/create-workout">
            <AuthUserContext.Consumer>
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
            </AuthUserContext.Consumer>
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default withAuthentication(App)
