import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '../index.css';
import { Provider } from 'react-redux';
import store from './reducers/store.js';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById('app'));
//wrap app in the router so you can use routes in application
root.render(
    <Provider store={store}>
      <StrictMode>
          <App />
      </StrictMode>
    </Provider>
);