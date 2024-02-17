import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'; //assuming we'll be using react router but can change if needed
import Signup from './components/Signup.jsx';
import Login from "./components/Login.jsx";

const App = () => {
    return (
    <BrowserRouter>
      <Routes>

       <Route path="/canvas" element={ 
           <canvas id="canvas" style={{backgroundColor: "blue"}} width={window.innerWidth} height={window.innerHeight}>Canvas</canvas>
          }/> 

        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes >
    </BrowserRouter>
    )
}

export default App;