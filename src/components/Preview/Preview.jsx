import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCameraImage,
  selectCameraImage,
} from "../../features/cameraSlice";
import { useNavigate } from "react-router-dom";
import "./Preview.css";
import { v4 as uuid } from "uuid";

// Icons
import CloseIcon from "@material-ui/icons/Close";

// Icons in Right side of the review
import SendIcon from "@material-ui/icons/Send";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import AttachFileIcon from "@material-ui/icons/AttachFile";

// firebase storage
import { db, storage } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "@firebase/storage";

const Preview = () => {
  // useSelector it grabs it from the redux
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // firebase
  const collectionRef = collection(db, "posts");

  // react components life cycle
  useEffect(() => {
    if (!cameraImage) {
      navigate("/");
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    // this will also trigger the useEffect and got to home screen
    dispatch(resetCameraImage());
  };
  const sendPost = (e) => {
    e.preventDefault();
    uploadFiles(cameraImage);
  };
  const uploadFiles = (file) => {
    if (!file) return;

    const id = uuid();
    const storageRef = ref(storage, `/posts/${id}`);

    uploadString(storageRef, file, "data_url").then((snapshot) => {
      //add a doc to firestore db
      getDownloadURL(snapshot.ref).then((url) => {
        addDoc(collectionRef, {
          imageUrl: url,
          username: "bob",
          read: false,
          timestamp: serverTimestamp(),
        });
        navigate("/chats");
      });
    });
  };

  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview_close" />

      <div className="preview_toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview_footer">
        <h2>SEND NOW</h2>
        <SendIcon fontSize="small" className="preview_sendIcon" />
      </div>
    </div>
  );
};

export default Preview;
