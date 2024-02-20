import React, { useState, useEffect, useRef } from "react";
import rough from "roughjs";
import getStroke from "perfect-freehand";

const Canvas = ({ elements, setElements, drawing, setDrawing, toolType }) => {
  const canvasRef = useRef(null);
  const RoughCanvasRef = useRef(null);

  useEffect(() => {
    RoughCanvasRef.current = rough.canvas(canvasRef.current);
  }, [toolType]);

  const freeDraw = (context, stroke) => {
    if (!stroke.length) return;

    context.beginPath();
    context.moveTo(stroke[0][0], stroke[0][1]);

    for (let i = 1; i < stroke.length - 2; i++) {
      const [x1, y1] = stroke[i];
      const [x2, y2] = stroke[i + 1];
      const xc = (x1 + x2) / 2;
      const yc = (y1 + y2) / 2;

      context.quadraticCurveTo(x1, y1, xc, yc);
    }

    context.lineTo(stroke[stroke.length - 1][0], stroke[stroke.length - 1][1]);
    context.stroke();
  };

  const handleMouseDown = (e) => {
    setDrawing(true);
    const { clientX, clientY } = e;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const newElement = createElement([], clientX, clientY);
    setElements((prevState) => [...prevState, newElement]);

    context.strokeStyle = "#000"; // Set the stroke color
    context.lineWidth = 2; // Set the line width
  };

  const handleMouseMove = (e) => {
    if (!drawing || elements.length === 0) return;
    const { clientX, clientY } = e;
    const index = elements.length - 1;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const updatedElement = createElement(
      elements[index].points || [],
      clientX,
      clientY
    );

    setElements((prevState) => {
      const elementsCopy = [...prevState];
      elementsCopy[index] = updatedElement;
      return elementsCopy;
    });

    freeDraw(context, updatedElement.points);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const createElement = (points, x, y) => {
    if (toolType === "pencil") {
      const updatedPoints = [...points, [x, y]];
      const stroke = getStroke(updatedPoints);
      return { points: updatedPoints, type: "pencil", stroke };
    } else if (toolType === "line") {
      if (points.length === 0) {
        const roughElement = RoughCanvasRef.current.generator.line(x, y, x, y);
        return { points: [[x, y]], type: "line", roughElement };
      } else {
        const updatedPoints = [...points, [x, y]];
        return { points: updatedPoints, type: "line" };
      }
    }
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
