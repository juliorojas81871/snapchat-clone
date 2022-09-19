import React, {useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { setCameraImage } from '../../features/cameraSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './WebcamCapture.css'

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: 'user',
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate('/preview');
  }, [webcamRef]);

  return (
    <div className='webcameCapture'>
        <Webcam 
          audio={false}
          height={videoConstraints.height}
          ref={webcamRef}

          screenshotFormat='image/jpeg'
          width={videoConstraints.width}
          videoConstraints={videoConstraints}
        />
        <RadioButtonUncheckedIcon 
          className='webcamCapture_button'
          onClick={capture}
          fontSize='large'
        />
    </div>
  )
}

export default WebcamCapture