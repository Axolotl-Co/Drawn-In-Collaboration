import React, { useState, useLayoutEffect, useRef } from "react";
import rough from "roughjs";

const Canvas = ({ elements, setElements, drawing, setDrawing, sendDrawing }) => {
  const canvasRef = useRef(null);
  const RoughCanvasRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const roughCanvas = rough.canvas(canvas);
    RoughCanvasRef.current = roughCanvas;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach(({ roughElement }) =>
      RoughCanvasRef.current.draw(roughElement)
    );
  }, [elements]);

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
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updatedElement = createElement(x1, y1, clientX, clientY);

    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
    sendDrawing(elementsCopy); //sends the updated drawing to the other clients
  };

  const handleMouseUp = () => {
    setDrawing(false);
    sendDrawing(elements);// Send the final drawing to other clients
  };

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
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

export default Canvas;
