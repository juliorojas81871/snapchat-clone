import React, { useState, useEffect } from 'react'
import './Chats.css'
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { db } from '../../firebase';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import { Chat } from '../index';

const Chats = () => {
    const [posts, setPosts] = useState([]);
    const [searchFriend, setSearchFriend] = useState('');

    // from data from firebase
    useEffect(()=>{
        onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')),(snapshot => setPosts(snapshot.docs.map(doc=>({
                    id: doc.id,
                    data: doc.data(),
                })))
            )
        )
    },[])

  return (
    <div className='chats'>
        <div className='chats_header'>
            <Avatar className='chats_avatar' />
            <div className='chats_search'>
                <SearchIcon />
                <input 
                    placeholder='Friends' 
                    type='text' 
                    onChange={(e) => setSearchFriend(e.target.value)}
                />
            </div>
            <ChatBubbleIcon className='chats_chatIcon' />
        </div>
        <div className='chats_posts'>
            {posts.filter((val) => {
                if(!searchFriend){
                    return val;
                } else if (val.data.username.toLowerCase().includes(searchFriend.toLowerCase())){
                    return val;
                }
            }).map(({id, data:{profilePic, username, timestamp, imageUrl, read}}) => (
                <Chat
                    key={id}
                    id={id}
                    username={username}
                    timestamp={timestamp}
                    imageUrl={imageUrl}
                    read={read}
                    profilePic={profilePic}
                />
            ))}
        </div>
    </div>
  )
}

export default Chats