
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"; //assuming we'll be using react router but can change if needed
import Canvas from './components/Canvas.jsx';
import Signup from './components/Signup.jsx';
import Login from "./components/Login.jsx";
import Toolbar from "./components/toolbar.jsx";
import { io } from "socket.io-client"
const socket = io.connect('http://localhost:3000') // server ... we can also put this in a serparate component and import it 




const App = () => {
<<<<<<< HEAD
=======
  // Event listener for connection
  const sendMessge = () => {

    socket.emit('send_message', 10, 'HI', {a : 'ehhhh'});
  }
    // Cleanup function to disconnect the socket when the component unmounts
 



>>>>>>> 746a201a69094f70366cfb7a19410918d5364d0c
  //sets state of elements on canvas to empty array
  const [elements, setElements] = useState([]);
  //sets state of drawing by user to false
  const [drawing, setDrawing] = useState(false);
  //sets state of element type to  a string
  const [elementType, setElementType] = useState("line");
  const [toolType, setToolType] = useState("pencil");
  //render the HTML canvas element
<<<<<<< HEAD
  

=======

  // <button onClick={sendMessge}> Send Message</button>

>>>>>>> 746a201a69094f70366cfb7a19410918d5364d0c

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
<<<<<<< HEAD
=======
        <Route path="/login" element={<Login/>}/>
>>>>>>> 746a201a69094f70366cfb7a19410918d5364d0c
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/canvas" element={
          <>
          <Toolbar toolType={toolType} setToolType={setToolType}/>
        <Canvas
          elements={elements}
          setElements={setElements}
          drawing={drawing}
          setDrawing={setDrawing}
<<<<<<< HEAD
          toolType={toolType}
          />
          </>
        }
        />
=======
        />}/>
>>>>>>> 746a201a69094f70366cfb7a19410918d5364d0c
      </Routes>
    </BrowserRouter>
  );
};

export default App;
