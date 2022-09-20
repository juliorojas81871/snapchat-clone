import React from "react";
import "./Chat.css";
import { Avatar } from "@mui/material";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import ReactTimeago from "react-timeago";
import { selectImage } from "../../features/appSlice";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";

const Chat = ({ id, profilePic, username, timestamp, imageUrl, read }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      updateDoc(doc(db, "posts", id), {
        read: true,
      });
      navigate(`/chats/view`, { replace: true });
    }
  };
  return (
    <div onClick={open} className="chat">
      <Avatar className="caht_avatar" src={profilePic} />
      <div className="chat_info">
        <h4>{username}</h4>
        <p>
          Tap to view -{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRoundedIcon className="chat_readIcon" />}
    </div>
  );
};

export default Chat;
