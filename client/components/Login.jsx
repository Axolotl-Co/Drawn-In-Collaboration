import React from "react"

const Login = () => {
    return (
        <div>
          <form id="boxcontainer">
            <input className='searchbox' name="username" type="text" placeholder="username" ></input>
            <input className='searchbox' name="password" type="password" placeholder="password" ></input>
            <input className="btn" type="submit" value="create user"></input>
          </form>

        </div>
        )
    }

    export default Login;