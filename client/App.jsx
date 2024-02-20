
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"; //assuming we'll be using react router but can change if needed
import rough from "roughjs";
import Canvas from './components/Canvas.jsx';
import Signup from './components/Signup.jsx';
import Login from "./components/Login.jsx";
import { io } from "socket.io-client"
const socket = io.connect('http://localhost:3000') // server ... we can also put this in a serparate component and import it 




const App = () => {
  // Event listener for connection
  const sendMessge = () => {

    socket.emit('send_message', 10, 'HI', {a : 'ehhhh'});
  }
    // Cleanup function to disconnect the socket when the component unmounts
 



  //sets state of elements on canvas to empty array
  const [elements, setElements] = useState([]);
  //sets state of drawing by user to false
  const [drawing, setDrawing] = useState(false);
  //sets state of element type to  a string
  const [elementType, setElementType] = useState("line");
  //render the HTML canvas element
  return (
    <div>


    <button onClick={sendMessge}> Send Message</button>

      <Signup>Signup</Signup>
      <Login>Login</Login>
      <Canvas
      elements={elements}
      setElements={setElements}
      drawing={drawing}
      setDrawing={setDrawing}
      />
    </div>
  );
};

export default App;
