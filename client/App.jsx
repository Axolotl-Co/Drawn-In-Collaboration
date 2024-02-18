
import React, { useState, useLayoutEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"; //assuming we'll be using react router but can change if needed
import rough from "roughjs";
import Canvas from './components/Canvas.jsx';
import Signup from './components/Signup.jsx';
import Login from "./components/Login.jsx";

const App = () => {
  //sets state of elements on canvas to empty array
  const [elements, setElements] = useState([]);
  //sets state of drawing by user to false
  const [drawing, setDrawing] = useState(false);
  //sets state of element type to  a string
  const [elementType, setElementType] = useState("line");
  //render the HTML canvas element
  return (
    <div>
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
