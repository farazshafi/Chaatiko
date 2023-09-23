import { Box, Button, Spinner, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { AddIcon } from '@chakra-ui/icons'
import ChatLoading from './ChatLoading'
import { getSender } from "../config/ChatLogics"
import GroupChatModal from './miscellaneous/GroupChatModal'
import ToggleColorMode from './ToggleColorMode'

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState()
  const [loading, setLoading] = useState(false)
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState()

  const toast = useToast()

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChats()
  }, [fetchAgain]);

  const fetchChats = async () => {
    setLoading(true)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get("/api/chat", config)
      setChats(data)
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Failed to load Chats.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top-left"
      })
      setLoading(false)
    }
  }

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir={"column"}
        alignItems={"center"}
        padding={3}
        width={{ base: "100%", md: "31%" }}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Box
          paddingBottom={3}
          paddingX={3}
          display={"flex"}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily={"Work sans"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text
            fontSize={{ base: "14px", md: "20px", lg: "25px" }}
          >
            My Chats
          </Text>
          <GroupChatModal>
            <Button
              display={"flex"}
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AddIcon />}
            >
              New Group Chat
            </Button>
          </GroupChatModal>

        </Box>
        <Box
          display={"flex"}
          flexDir={"column"}
          p={3}
          // bg={"#F8F8F8"}
          width={"100%"}
          height={"100%"}
          borderRadius={"lg"}
          overflow={"hidden"}
        >
          {loading && <ChatLoading />}
          {chats && (
            <Stack overflowY={"scroll"}>
              {chats.map((chat) => (
                <Box
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  onClick={() => setSelectedChat(chat)}
                  cursor={"pointer"}
                  px={3}
                  py={2}
                  borderRadius={"lg"}
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </>
  )
}

export default MyChats