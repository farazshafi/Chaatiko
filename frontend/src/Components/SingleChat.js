import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderFull } from '../config/ChatLogics'
import ProfileModal from './miscellaneous/ProfileModal'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'
import axios from 'axios'
import "../style.css"
import ScrollableChat from './ScrollableChat'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState()

    const { user, selectedChat, setSelectedChat } = ChatState()
    const toast = useToast()

    useEffect(() => {
        fetchMessage()
    }, [selectedChat]);

    const fetchMessage = async () => {
        console.log(messages)
        if (!selectedChat) return;
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config)
            console.log(data)
            setMessages(data)
            setLoading(false)
        } catch (error) {
            toast({
                title: 'Error Occured.',
                description: error.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                }
                setNewMessage("")
                const { data } = await axios.post("/api/message", {
                    content: newMessage,
                    chatId: selectedChat._id
                }, config)
                setMessages([...messages, data])
            } catch (error) {
                toast({
                    title: 'Error Occured.',
                    description: error.data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value)
    }

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w={"100%"}
                        fontFamily={"Work sans"}
                        display={"flex"}
                        justifyContent={{ base: "space-between" }}
                        alignItems={"center"}
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ?
                            (<>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                            </>

                            )
                            :
                            (<>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal fetchMessage={fetchMessage} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                            </>)
                        }
                    </Text>
                    <Box
                        display="flex"
                        flexDir={"column"}
                        justifyContent={"flex-end"}
                        p={3}
                        width="100%"
                        height="100%"
                        overflow={"hidden"}
                        borderRadius={"lg"}
                    >
                        {loading ?
                            <Spinner
                                size={'xl'}
                                w={20}
                                h={20}
                                alignSelf={'center'}
                                margin={"auto"}
                            />
                            :
                            (
                                <>
                                    <div className='message'>
                                        <ScrollableChat
                                            user={user}
                                            messages={messages}
                                        />
                                    </div>
                                </>
                            )
                        }
                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            <Input
                                variant={"filled"}
                                background={"#E0E0E0"}
                                placeholder='Enter a message...'
                                onChange={typingHandler}
                                value={newMessage}
                            />
                        </FormControl>
                    </Box>
                </>
            ) : (
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    h="100%"
                    justifyContent={"center"}
                >
                    <Text
                        fontFamily={"Work sans"}
                        pb={3}
                        fontSize={"3xl"}
                    >
                        Click on a user to start chating
                    </Text>
                </Box>
            )
            }
        </>
    )
}

export default SingleChat