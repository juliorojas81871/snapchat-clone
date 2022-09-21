import React from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import SnapChat from "../../assets/snapchat.jpg";
import { auth, provider } from "../../firebase";
import { Button } from "@mui/material";
import { login } from "../../features/appSlice";
import { signInWithPopup } from '@firebase/auth'

const Login = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth,provider).then(result=>{
      dispatch(
        login({
          username: result.user.displayName,
          profilePic: result.user.photoURL,
          id: result.user.uid,
        })
      );
    }).catch(err => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img src={SnapChat} alt="" />
        <Button variant="outlined" onClick={signIn}>Sign in</Button>
      </div>
    </div>
  );
};

export default Login;
