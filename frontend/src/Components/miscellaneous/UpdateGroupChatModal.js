import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    IconButton,
    useToast,
    Box,
    FormControl,
    Input,
    Text,
    MenuDivider,
    Menu,
    Spinner,
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
import axios from "axios"
import UserListItem from '../UserAvatar/UserListItem'

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessage }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, selectedChat, setSelectedChat } = ChatState()

    const [groupChatName, setGroupChatName] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [renameLoading, setRenameLoading] = useState(false);

    const toast = useToast()

    const handleAddToGroup = async (singleUser) => {
        if (selectedChat.users.find((u) => u._id === singleUser._id)) {
            toast({
                title: 'User Alrady in Group.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        }
        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: 'only admin can add someone!.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.put(`/api/chat/addToGroup`, { chatId: selectedChat._id, userId: singleUser }, config)
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setLoading(false)
            toast({
                title: 'User Added To Group!.',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
        } catch (error) {
            toast({
                title: 'Cannot add User.',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            setLoading(false)
        }
    }

    const handleRemove = async (removeUser) => {
        if (selectedChat.groupAdmin._id !== user._id && removeUser._id !== user._id) {
            toast({
                title: "Only admins can remove someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.put(`/api/chat/removeFromGroup`, { chatId: selectedChat._id, userId: removeUser._id }, config)
            removeUser._id === user._id ? (
                <>
                    {setSelectedChat()}
                    {toast({
                        title: "Group Deleted ",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "bottom",
                    })}
                </>
            ) : setSelectedChat(data)
            fetchMessage()
            setFetchAgain(!fetchAgain)
            setLoading(false)
        } catch (error) {
            toast({
                title: 'Error Occured!.',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const handleRename = async () => {
        if (!groupChatName || groupChatName === "") {
            toast({
                title: 'Please enter Group Chat Name.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        }
        try {
            setRenameLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.put(`/api/chat/rename`, { chatId: selectedChat._id, chatName: groupChatName }, config)
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameLoading(false)
        } catch (error) {
            toast({
                title: 'Rename Failed.',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            setRenameLoading(false)
        }
        setGroupChatName("")
    }

    const handleSearch = async (event) => {
        if (!event) {
            return;
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`/api/user?search=${event}`, config)
            const dataArray = Array.from(data)
            setLoading(false)
            setSearchResult(dataArray)
        } catch (error) {
            toast({
                title: 'Errror occured.',
                description: "Failed to load search result",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top-left"
            })
        }
    }

    return (
        <>
            <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontFamily={"Work sans"}
                        fontSize={"35px"}
                        display={"flex"}
                        justifyContent={"center"}
                    >
                        {selectedChat.chatName}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Menu>
                            <Text pb={3} as={"b"} fontFamily={"Work sans"} fontSize={"sm"}>Group Members</Text>
                            <MenuDivider />
                        </Menu>
                        <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                            {selectedChat.users.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    admin={selectedChat.groupAdmin}
                                    handleFunction={() => handleRemove(u)}
                                />
                            ))}
                        </Box>
                        <Menu>
                            <Text fontFamily={"Work sans"} fontSize={"sm"} as={"b"}>Update</Text>
                            <MenuDivider />
                        </Menu>
                        <FormControl display={"flex"}>
                            <Input
                                placeholder='Update Group Name'
                                mb={3}
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <Button
                                type='submit'
                                variant={"solid"}
                                colorScheme='teal'
                                ml={1}
                                isLoading={renameLoading}
                                onClick={handleRename}
                            >Update</Button>
                        </FormControl>
                        <FormControl >
                            <Input
                                placeholder='Add a user to group'
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        {loading ? <Spinner size={"lg"} /> : (
                            searchResult.slice(0, 4).map(singleUser => (
                                <UserListItem
                                    key={singleUser._id}
                                    user={singleUser}
                                    handleFunction={() => handleAddToGroup(singleUser)}
                                />
                            ))
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' onClick={() => handleRemove(user)} >
                            Delete Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModal