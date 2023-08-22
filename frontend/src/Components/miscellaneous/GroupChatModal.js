import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    useToast,
    FormControl,
    Input,
    Box,
    Spinner,
} from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import { SearchIcon } from '@chakra-ui/icons'
import UserListItem from '../UserAvatar/UserListItem'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'

const GroupChatModal = ({ children }) => {
    const [groupChatName, setGroupChatName] = useState("")
    const [search, setSearch] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, chats, setChats } = ChatState()
    const toast = useToast()

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

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: 'please fill all the feilds.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.post("/api/chat/group", { name: groupChatName, users: JSON.stringify(selectedUsers.map((u) => u._id)) }, config)
            setChats([data, ...chats])
            onClose()
            toast({
                title: 'New Group Created.',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
        } catch (error) {
            toast({
                title: 'Failed to create Group.',
                description: error.response.data,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
        }
    }

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: 'user already exist.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            return;
        }
        setSelectedUsers([...selectedUsers, userToAdd])
    }

    const handleDelete = (deleteUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== deleteUser._id))
    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize={"35px"}
                        fontFamily={"Work sans"}
                        display={"flex"}
                        justifyContent={"center"}
                    >
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"}>
                    </ModalBody>
                    <FormControl>
                        <Input
                            value={groupChatName}
                            placeholder='Group Name'
                            mb={3}
                            onChange={(e) => setGroupChatName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl display={"flex"}>
                        <Input
                            placeholder='Add users to group'
                            mb={3}
                            width={"90%"}
                            onChange={(event) => handleSearch(event.target.value)}
                        />
                    </FormControl>
                    <Box
                        width={"100%"}
                        display={"flex"}
                        flexWrap={"wrap"}
                    >
                        {selectedUsers.map(u => (
                            <UserBadgeItem
                                key={u._id}
                                user={u}
                                handleFunction={() => handleDelete(u)}
                            />
                        ))}
                    </Box>

                    {loading ? <Spinner /> : (
                        searchResult.slice(0, 4).map(singleUser => (
                            <UserListItem
                                key={singleUser._id}
                                user={singleUser}
                                handleFunction={() => handleGroup(singleUser)}
                            />
                        ))
                    )}
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Create Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal