import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { WebcamCapture, Preview, Chats, ChatView, Login } from "./pages/index";
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/appSlice';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

    useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
        if(authUser){
          dispatch(login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          }))
        } else{
          dispatch(logout())
        }
      })
    }, [])

  return (
    <div className='app'>
      <Router>
      {!user ? (
        <Login />
      ) : (
        <div className='app_body'>
          <Routes>
            <Route path="/chats/view" element={<ChatView />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/preview" element={<Preview />} />
            <Route exact path="/" element={<WebcamCapture />} />
          </Routes>
        </div>
      )}
        
      </Router>
    </div>
  );
}

export default App;
