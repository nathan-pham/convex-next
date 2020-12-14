import { useState } from "react"

import Root from "../components/root/root"
import * as Database from "../js/client/database"

const Login = () => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  return (
    <Root title="Login">
      <div className="margin flex justify-between align-center">
        <div className="slogan">
          <img src="/icons/apple-icon.png" alt="Convex Logo"/>
          <h1>onvex</h1>
          <p>Connect and share your talents with Convex</p>
        </div>
        <div className="margin card flex direction-column align-center">
          <input className="default" name="email" placeholder="Email" type="email" onInput={ (e) => setEmail(e.target.value) } />
          <input className="default" name="password" placeholder="Password" type="password" onInput={ (e) => setPassword(e.target.value) } />

          <button className="button-primary" id="login" onClick={ () => Database.loginAccount(email, password) }>Log In</button>

          <a href="/">Forgot password?</a>

          <button className="button-accent">Create New Account</button>
        </div>
      </div>
    </Root>
  )
}

export default Login
