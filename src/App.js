import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WebcamCapture, Preview, Chats, ChatView, Login } from "./pages/index";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/appSlice";
import SnapChat2 from "./assets/snapchat2.jpg";
import Iphone13 from "./assets/iphone13.png";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img src={SnapChat2} alt="" className="app_logo" />
            <div>
              <img src={Iphone13} className="app_phone_body" />
              <div className="app_bodyBackground">
                <div className="app_body">
                  <Routes>
                    <Route path="/chats/view" element={<ChatView />} />
                    <Route exact path="/" element={<Chats />} />
                    <Route path="/preview" element={<Preview />} />
                    <Route path="/camera" element={<WebcamCapture />} />
                  </Routes>
                </div>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
