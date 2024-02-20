import React, { useState } from "react";
    import './component.scss';
    
    // include link for user to loging page
    const Signup = () => {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
    
      const handleSubmit = async (event) => {
        event.preventDefault(); //prevents blank submission
    
        const response = await fetch ('/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          window.location.href = '/login';
        } else {
          console.error(data.error);
        }
      };
    
      return (
        <div>
          <a href="login">
            <button>Login Instead</button>
          </a>
          <form id="boxContainerSignup" onSubmit={handleSubmit}>
            <input className='searchbox' name="username" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input className='searchbox' name="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <input className="signupButton" type="submit" value="Signup"></input>
          </form>
        </div>
      );
    }
    
    export default Signup;