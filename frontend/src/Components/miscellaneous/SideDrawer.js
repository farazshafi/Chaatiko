import React, { useState } from 'react'
import { Box } from "@chakra-ui/layout"
import {
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  useToast,
  Spinner
} from "@chakra-ui/react"
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons"
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'
import { getSender } from '../../config/ChatLogics'
import { Effect } from "react-notification-badge"
import NotificationBadge from 'react-notification-badge/lib/components/NotificationBadge'
import ToggleColorMode from '../ToggleColorMode'

const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchReasult, setSearchReasult] = useState([])
  const [loading, setLoading] = useState('')
  const [loadingChat, setLoadingChat] = useState('')

  const { user, selectedChat, setSelectedChat, chats, setChats, notification, setNotification } = ChatState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const toast = useToast()

  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    navigate("/")
  }

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please fill the Feilds.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "top-left"
      })
      return;
    }
    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`api/user?search=${search}`, config)
      const dataArray = Array.from(data)
      setLoading(false)
      setSearchReasult(dataArray)
    } catch (error) {
      toast({
        title: 'No User Found.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top-left"
      })
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post("/api/chat", { userId }, config)
      if (!chats.find((chat) => chat._id === data._id)) {
        setChats([data, ...chats])
      }
      setSelectedChat(data)
      setLoadingChat(false)
      onClose()
    } catch (error) {
      toast({
        title: 'Cannot Fetch chat.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top-left"
      })
    }
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        borderWidth="5px"
        padding="5px 10px 5px 10px"
      >
        <Tooltip
          label="Search User to Chat"
          hasArrow
          placement='bottom-end'
        >
          <Button variant="ghost" onClick={onOpen}>
            <i class="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">Search User</Text>
          </Button>
        </Tooltip>
        <Text
        fontFamily={"Work sans"}
        fontSize={{base:"small", md:"35px", lg:'40px'}}
        >
        Chaatiko
        </Text>
        
        <div>
        <ToggleColorMode 
          ml={"0px"}
        />
          <Menu>
            <MenuButton padding="1">
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize={"2xl"} margin={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((singleNotification) => (
                <MenuItem
                  key={singleNotification._id}
                  onClick={() => {
                    setSelectedChat(singleNotification.chat)
                    setNotification(notification.filter((n) => n !== singleNotification))
                  }}
                >
                  {singleNotification.chat.isGroupChat ? `New Message in ${singleNotification.chat.chatName}` : `New Message from ${getSender(user._id, singleNotification.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size={'sm'} cursor={"pointer"} name={user.name} src={user.profile} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth={"1px"}>Search User</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} paddingBottom={2}>
              <Input
                placeholder='Search by name or email'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                mr={2}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? <ChatLoading /> : (
              searchReasult.map((singleUser) => (
                <UserListItem
                  key={singleUser._id}
                  user={singleUser}
                  handleFunction={() => accessChat(singleUser._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display={"flex"} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer