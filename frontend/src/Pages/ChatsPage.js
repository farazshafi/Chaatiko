import React, { useEffect, useState } from 'react'
import axios from "axios"

const ChatsPage = () => {
    const [chats, setChats] = useState([])

    const fetchChats = async () => {
        const { data } = await axios.get("/api/chat")
        if (data) {
            setChats(data)
        } else {
            console.log("No Data from api/chats")
        }
    }

    useEffect(() => {
        fetchChats()
    }, [])
    return (
        <div>
            {chats.map(chat => (
                <div key={chat._id}>{chat.chatName}</div>
            ))}
        </div>
    )
}

export default ChatsPage