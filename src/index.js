// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Assuming you have global styles here
import App from './App';  // Make sure the path is correct

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);