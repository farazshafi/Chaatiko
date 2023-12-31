import React, { useEffect } from 'react'
import { Box, Container, Tabs, Text, Tab, TabPanel, TabPanels, TabList } from "@chakra-ui/react"
import Login from '../Components/Authentication/Login'
import Signup from '../Components/Authentication/Signup'
import { useNavigate } from 'react-router-dom'
import ToggleColorMode from '../Components/ToggleColorMode'

const HomePage = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    if (userInfo) {
      navigate("/chats")
    }
  }, [navigate])

  return <>
    <ToggleColorMode
      pos="absolute"
      mb="3px"
    />
    <br />
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">Chaatiko</Text>
      </Box>
      <Box
        w={"100%"}
        p={4}
        borderRadius={'lg'}
        borderWidth={"1px"}
      >
        <Tabs variant='soft-rounded'>
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Sign In</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  </>
}

export default HomePage