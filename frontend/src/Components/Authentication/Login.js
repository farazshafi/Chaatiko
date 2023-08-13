import React, { useState } from 'react'
import { VStack } from "@chakra-ui/layout"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Button, useToast } from '@chakra-ui/react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const toast = useToast()
  const navigate = useNavigate()

  const handleClick = () => {
    setShow(!show)
  }

  const submitHandler = async () => {
    setLoading(true)
    if (!email || !password) {
      toast({
        title: 'Please Fill all the Feilds.',
        status: 'warning',
        duration: 5000,
        position: "bottom",
        isClosable: true,
      })
      setLoading(false)
      return;
    }
    try {
      const config = {
        Headers : {
            "Content-type": "application/json",
        },
    }
      const { data } = await axios.post("/api/user/login",{ email, password },config)

      toast({
        title: 'Login Success.',
        status: 'success',
        duration: 5000,
        position: "bottom",
        isClosable: true,
      })
      localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)
      navigate("/chats")

    } catch (error) {
      toast({
        title: 'Error Occured.',
        description: error.response.data.message,
        status: 'warning',
        duration: 5000,
        position: "bottom",
        isClosable: true,
      })
      setLoading(false)
    }
  }

  const guestUserHandler = () => {
    setEmail("guest@example.com")
    setPassword("123456")
  }

  return (
    <>
      <VStack spacing="5px">
        {/* Email  */}
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            type='email'
            placeholder='Enter Your Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        {/* Password  */}
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              value={password}
              type={show ? 'text' : 'password'}
              placeholder='Enter Your Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem" onClick={handleClick}>
              <Button h="1.75rem" size={'sm'}>
                {show ? "Hide" : "show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {/* Button  */}
        <Button
          type='submit'
          colorScheme='blue'
          width={"100%"}
          style={{ marginTop: 15 }}
          isLoading={loading}
          onClick={submitHandler}
        >
          Login
        </Button>
        <Button
          variant='solid'
          colorScheme='red'
          width={"100%"}
          style={{ marginTop: 15 }}
          onClick={guestUserHandler}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </>
  )
}

export default Login