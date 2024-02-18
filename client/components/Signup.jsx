import React from "react"
import './component.scss';



// include link for user to loging page
const Signup = () => {
    return (
        <div>
          <a href="login">
            <button>Login Instead</button>
          </a>
          <form id="boxContainerSignup">
            <input className='searchbox' name="username" type="text" placeholder="username" ></input>
            <input className='searchbox' name="password" type="password" placeholder="password" ></input>
            <input className="signupButton" type="submit" value="Signup"></input>
          </form>
        </div>
        )
    }

    export default Signup;