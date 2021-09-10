import { Button } from "@material-ui/core"
import { auth, uiConfig } from "../components/Data/firebase"
import "firebaseui/dist/firebaseui.css"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
// import * as firebase

const Login = () => {
  return (
    <main>
      <div className="">
        <h1>Welcome to Fit4Life!</h1>
        <h2>Conquer your goals by tracking your workouts</h2>
        <div>
          <button onClick={() => auth.signInAnonymously()}>
            <p>Continue as guest</p>
          </button>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
      </div>
    </main>
  )
}

export default Login
