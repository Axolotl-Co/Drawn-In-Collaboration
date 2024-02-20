import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './component.scss';

const Login = () => {

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevents from blank submission
  
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
  
    if(response.ok) {
      window.location.href = '/canvas';
    } else{
      console.error(data.error);
    }
  };






    return (
        <div>
          <form id="boxContainerLogin" onSubmit={handleSubmit}>
            <input className='searchbox' name="username" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} ></input>
            <input className='searchbox' name="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <input className="loginButton" type="submit" value="Login"></input>
            <Link to="/signup">
          <button>Sign Up</button>
          </Link>
          </form>
          
        </div>
        )
    }

    export default Login;