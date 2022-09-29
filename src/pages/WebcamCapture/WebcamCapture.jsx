import React, { useCallback, useEffect, useRef, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { setCameraImage } from "../../features/cameraSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./WebcamCapture.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const WebcamCapture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("Allow camera capture");
  const [userMedia, setUserMedia] = useState(null);
  const canvas = useRef();

  // Getting permission and Getting the video stream
  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        setUserMedia(stream);
        setError(false);
      } catch (e) {
        console.log(e);
        setError("You denied camera access");
      }
    })();
  }, []);

  useEffect(() => {
    // if nothing return nothing
    if (!canvas.current || !userMedia) return;

    const video = document.createElement("video");

    video.srcObject = userMedia;
    video.play();

    const [videoTrack] = userMedia.getVideoTracks();

    const { width, height, frameRate } = videoTrack.getSettings();

    const ctx = canvas.current.getContext("2d");
    let lastUpdate = Date.now();
    const CAMERA_UPDATE_RATE = 1000 / frameRate;

    function update() {
      // to reduce the amount of fps less than 30
      if (Date.now() - lastUpdate < CAMERA_UPDATE_RATE) {
        return requestAnimationFrame(update);
      }
      lastUpdate = Date.now();
      // to get the camera center
      ctx.drawImage(video, -(width / 2 - 125), 0, width, height);
      requestAnimationFrame(update);
    }
    update();
  }, [canvas.current, userMedia]);

  // to capture the pic and navigate to preview
  const capture = useCallback(() => {
    if (!canvas.current) return;
    const imageSrc = canvas.current.toDataURL();
    dispatch(setCameraImage(imageSrc));
    navigate("/preview", { replace: true });
  }, [canvas.current]);

  if (error) {
    // for the setError, css the heck out of it
    return <div className="alert">{error}</div>;
  }

  const closeWebcam = () => {
    // this will also trigger the useEffect and got to home screen
    navigate("/", { replace: true });
  };

  return (
    <div className="webcameCapture">
      <ArrowBackIosIcon
        onClick={closeWebcam}
        className="webcameCapture_back"
      />
      <canvas ref={canvas} height={480} width={250} />
      <RadioButtonUncheckedIcon
        className="webcamCapture_button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
};

export default WebcamCapture;
