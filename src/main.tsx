/*
Main entry point for React app. where React app is rendered to the DOM
imports the root App component, and renders application to the #root div in index.html
*/


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Rendering the root component and inserting it into the #root div in index.html
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)