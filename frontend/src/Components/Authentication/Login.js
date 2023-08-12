import React, { useState } from 'react'
import { VStack } from "@chakra-ui/layout"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Button } from '@chakra-ui/react'

const Login = () => {

  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleClick = () => {
    setShow(!show)
  }

  const submitHandler = () => {
    // submit function goes here
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
          colorScheme='blue'
          width={"100%"}
          style={{ marginTop: 15 }}
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