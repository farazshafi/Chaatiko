import React, { useState } from 'react'
import { VStack } from "@chakra-ui/layout"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Button } from '@chakra-ui/react'

const Signup = () => {

    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [profile, setProfile] = useState()

    const handleClick = () => {
        setShow(!show)
    }

    const postDetails = (profile) => {
        // profile funcitons
    }

    const submitHandler = () => {
        // submit function goes here
    }

    return (
        <>
            <VStack spacing="5px">
                {/* Name  */}
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                        type='text'
                        placeholder='Enter Your Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>
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
                            type={show ? 'text':'password'}
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
                {/* Confirm Password  */}
                <FormControl>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={show ? 'text':'password'}
                            placeholder='Enter Your Confirm Password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem" onClick={handleClick}>
                            <Button h="1.75rem" size={'sm'}>
                                {show ? "Hide" : "show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                {/* Profile  */}
                <FormControl>
                    <FormLabel>Upload Your Profile Picture</FormLabel>
                        <Input
                            type="file"
                            p={1.5}
                            accept='image/*'
                            onChange={(e) => postDetails(e.target.files[0])}
                        />
                </FormControl>
                {/* Button  */}
                <Button 
                colorScheme='blue'
                width={"100%"}
                style={{marginTop:15}}
                onClick={submitHandler}
                >
                    Sign Up
                </Button>
            </VStack>
        </>
    )
}

export default Signup