
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
  // Cleanup function to disconnect the socket when the component unmounts
  
  
  
  
  //sets state of elements on canvas to empty array
  const [elements, setElements] = useState([]);
  //sets state of drawing by user to false
  const [drawing, setDrawing] = useState(false);
  //sets state of element type to  a string
  const [elementType, setElementType] = useState("line");
  //render the HTML canvas element
  
  // <button onClick={sendMessge}> Send Message</button>
  const sendDrawing = (newElements) => {
    socket.emit('draw-line', { elements: newElements, drawing, elementType });
    
  }

useEffect(()=> {
  socket.on('draw-line', (data) => {
    setElements(data.elements);
  });
  return () => {
    socket.off('draw-line'); 
  };
}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/canvas" element={<Canvas
          elements={elements}
          setElements={setElements}
          drawing={drawing}
          setDrawing={setDrawing}
          sendDrawing={sendDrawing}
        />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
