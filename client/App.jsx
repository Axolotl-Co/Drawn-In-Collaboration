
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"; //assuming we'll be using react router but can change if needed
import Canvas from './components/Canvas.jsx';
import Signup from './components/Signup.jsx';
import Login from "./components/Login.jsx";
import Toolbar from "./components/toolbar.jsx";
import { io } from "socket.io-client"
const socket = io.connect('http://localhost:3000') // server ... we can also put this in a serparate component and import it 
import logo from './assets/logo.jpg'



const App = () => {
  //sets state of elements on canvas to empty array
  const [elements, setElements] = useState([]);
  //sets state of drawing by user to false
  const [drawing, setDrawing] = useState(false);
  //sets state of element type to  a string
  const [elementType, setElementType] = useState("line");
  const [toolType, setToolType] = useState("pencil");
  //render the HTML canvas element
  


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/canvas" element={
          <>
          <Toolbar toolType={toolType} setToolType={setToolType}/>
        <Canvas
          elements={elements}
          setElements={setElements}
          drawing={drawing}
          setDrawing={setDrawing}
          toolType={toolType}
          />
          </>
        }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
