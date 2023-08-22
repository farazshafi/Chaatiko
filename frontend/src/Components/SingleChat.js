import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderFull } from '../config/ChatLogics'
import ProfileModal from './miscellaneous/ProfileModal'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat } = ChatState()

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
                                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
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
                        {/* message here  */}
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
            )}
        </>
    )
}

export default SingleChat