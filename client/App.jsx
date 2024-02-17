
import React, { useState, useLayoutEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //assuming we'll be using react router but can change if needed
import rough from "roughjs";

const App = () => {
  //sets state of elements on canvas to empty array
  const [elements, setElements] = useState([]);
  //sets state of drawing by user to false
  const [drawing, setDrawing] = useState(false);
  //sets state of element type to  a string
  const [elementType, setElementType] = useState("line");

  const canvasRef = useRef(null);
  const RoughCanvasRef = useRef(null);

  //example from MDN on how to render shapes to the canvas
  useLayoutEffect(() => {
    // const canvas = document.getElementById("canvas");
    const canvas = canvasRef.current;
    const roughCanvas = rough.canvas(canvas);
    RoughCanvasRef.current = roughCanvas;
    // const roughCanvas = rough.canvas(canvas);
    const context = canvas.getContext("2d");
    //clearRect method will clear canvas in rectangle shape
    //0,0 represents top left corner and canvas width and canvas height specify how much of canvas to clear
    context.clearRect(0, 0, canvas.width, canvas.height);
    // const generator = roughCanvas.generator;
    elements.forEach(({ roughElement }) => RoughCanvasRef.current.draw(roughElement))
    const rectangle = RoughCanvasRef.current.generator.rectangle(10, 10, 100, 100);
    const line = RoughCanvasRef.current.generator.line(10, 10, 110, 110);
    RoughCanvasRef.current.draw(rectangle);
    RoughCanvasRef.current.draw(line);
  }, [elements]);

  //createElement func will create a line
  //can build out more for other shapes
  const createElement = (x1, y1, x2, y2) => {
    const roughElement = RoughCanvasRef.current.generator.line(x1, y1, x2, y2);
    return { x1, y1, x2, y2, roughElement };
  };

  const handleMouseDown = (e) => {
    setDrawing(true);
    const { clientX, clientY } = e;
    const element = createElement(clientX, clientY, clientX, clientY);
    setElements((prevState) => [...prevState, element]);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const { clientX, clientY } = e;
    const index = elements.length -1;
    const { x1, y1 } = elements[index];
    const updatedElement = createElement(x1, y1, clientX, clientY)
    // console.log("mouse coordinates: ", clientX, clientY);

    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
  };

  const handleMouseUp = (e) => {
    setDrawing(false);
  };

  //render the HTML canvas element
  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      // style={{backgroundColor: "blue"}}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      Canvas
    </canvas>
  );
};

export default App;
