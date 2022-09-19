import React from 'react';
import './App.css';
import WebcamCapture from './components/WebcamCapture/WebcamCapture';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Preview from './components/Preview/Preview';

function App() {
  return (
    <div className='app'>
      <Router>
        <div className='app_body'>
          <Routes>
            <Route path="/preview" element={<Preview />} />
            <Route exact path="/" element={<WebcamCapture />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
