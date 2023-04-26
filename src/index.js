import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import './css/index.scss'
import { BrowserRouter } from 'react-router-dom'
import ReactCardSlider from "./components/CardSlider"

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
const slides = ReactDOM.createRoot(document.getElementById('root'))
slides.render(
    <BrowserRouter>
      <ReactCardSlider />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
