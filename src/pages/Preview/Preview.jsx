import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCameraImage,
  selectCameraImage,
} from "../../features/cameraSlice";
import { useNavigate } from "react-router-dom";
import "./Preview.css";
import { v4 as uuid } from "uuid";
import { selectUser } from "../../features/appSlice";
// Icons
import CloseIcon from "@mui/icons-material/Close";

// Icons in Right side of the review
import SendIcon from "@mui/icons-material/Send";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CreateIcon from "@mui/icons-material/Create";
import NoteIcon from "@mui/icons-material/Note";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CropIcon from "@mui/icons-material/Crop";
import TimerIcon from "@mui/icons-material/Timer";
import AttachFileIcon from "@mui/icons-material/AttachFile";

// firebase storage
import { db, storage } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

const Preview = () => {
  // useSelector it grabs it from the redux
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  // firebase
  const collectionRef = collection(db, "posts");

  // react components life cycle
  useEffect(() => {
    if (!cameraImage) {
      navigate("/camera", { replace: true });
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
          username: user.username,
          profilePic: user.profilePic,
          read: false,
          timestamp: serverTimestamp(),
        });
        navigate("/", { replace: true });
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
