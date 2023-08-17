import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ChatState } from '../Context/ChatProvider'
import SideDrawer from "../Components/miscellaneous/SideDrawer"
import {Box} from "@chakra-ui/layout"
import MyChats from "../Components/MyChats"
import ChatBox from "../Components/ChatBox"

const ChatsPage = () => {
    const { user } = ChatState()

    useEffect(() => {
        
    }, []);

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box display="flex" justifyContent="space-between" width="100%" height="91.5vh" padding="10px">
                {user && <MyChats />}
                {user && <ChatBox />}
            </Box>
        </div>
    )
}

export default ChatsPage