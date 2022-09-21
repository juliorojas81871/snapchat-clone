import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectSelectedImage } from '../../features/appSlice'
import './ChatView.css'

const ChatView = () => {
    const selectImage = useSelector(selectSelectedImage);
    const navigate = useNavigate();

    useEffect(() => {
        if(!selectImage){
            exist();
        }
    },[selectImage])

    const exist = () => {
        navigate('/chats', { replace: true }) 
    }
  return (
    <div className='chatView'>
        <img src={selectImage} onClick={exist} alt='' />
    </div>
  )
}

export default ChatView