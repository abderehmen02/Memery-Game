import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import TutorialMaterialUi from './materialUI/tutorial'
import 'dotenv' 
// import FrameMotion from './framer-motion'
console.log(process.env)
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
