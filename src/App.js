import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { ThemeProvider } from "@material-ui/core/styles"
import theme from "./config/theme.config"

import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Dashboard from "./components/Dashboard"
import { AuthUserContext } from "./components/Firebase/withAuthentication"
import CreateWorkout from "./components/CreateWorkout"

function App({ Component, pageProps }) {
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
            <CreateWorkout />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

export default App
