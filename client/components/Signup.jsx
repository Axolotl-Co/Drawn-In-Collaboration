import React from "react"



// include link for user to loging page
const Signup = () => {
    return (
        <div>
          <a href="login">
            <button>Login Instead</button>
          </a>
          <form id="boxcontainer">
            <input className='searchbox' name="username" type="text" placeholder="username" ></input>
            <input className='searchbox' name="password" type="password" placeholder="password" ></input>
            <input className="btn" type="submit" value="create user"></input>
          </form>
        </div>
        )
    }

    export default Signup;