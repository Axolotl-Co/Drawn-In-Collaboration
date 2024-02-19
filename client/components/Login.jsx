import React from "react"
import './component.scss';

const Login = () => {
    return (
        <div>
          <form id="boxContainerLogin">
            <input className='searchbox' name="username" type="text" placeholder="username" ></input>
            <input className='searchbox' name="password" type="password" placeholder="password" ></input>
            <input className="loginButton" type="submit" value="Login"></input>
          </form>

        </div>
        )
    }

    export default Login;