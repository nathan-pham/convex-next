import Root from "../components/root/root"

const Login = () => {
  return (
    <Root title="Login">
      <div className="margin flex justify-between align-center">
        <div className="slogan">
          <img src="/icons/apple-icon.png" alt="Convex Logo"/>
          <h1>onvex</h1>
          <p>Connect and share your talents with Convex</p>
        </div>
        <div className="margin card flex direction-column align-center">
          <input className="default" name="email" placeholder="Email" type="email" />
          <input className="default" name="password" placeholder="Password" type="password" />
          <button className="button-primary" id="login">Log In</button>
          <a href="/">Forgot password?</a>
          <button className="button-accent" onClick={ () => createAlert("test") }>Create New Account</button>
        </div>
      </div>
    </Root>
  )
}

export default Login
