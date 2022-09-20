import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { WebcamCapture, Preview, Chats, ChatView } from "./components/index";

function App() {
  return (
    <div className='app'>
      <Router>
        <div className='app_body'>
          <Routes>
            <Route path="/chats/view" element={<ChatView />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/preview" element={<Preview />} />
            <Route exact path="/" element={<WebcamCapture />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
