import React, { useState, useLayoutEffect, useRef } from "react";
import rough from "roughjs";
import getStroke from "perfect-freehand";
import './component.scss';

const Toolbar = ({ setToolType }) => {


  return (
    <div className="toolbar">
      <h1 className="title">Drawn In Collaboration</h1>
      <div className="buttons">
        <label>
          <input
            type="radio"
            name="tool"
            value="pencil"
            onChange={(e) => setToolType("pencil")}
          />
          Black
        </label>
        <label>
          <input
            type="radio"
            name="tool"
            value="line"
            onChange={(e) => setToolType("line")}
          />
          Red
        </label>
      </div>
    </div>
  );
};

export default Toolbar;
