import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; //assuming we'll be using react router but can change if needed

const App = () => {
    return <canvas id="canavs" style={{backgroundColor: "blue"}} width={window.innerWidth} height={window.innerHeight}>Canvas</canvas>
}

export default App;