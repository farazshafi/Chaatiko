import React, { useState } from 'react'
import { VStack } from "@chakra-ui/layout"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Button, useToast } from '@chakra-ui/react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {

    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [profile, setProfile] = useState()
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    const navigate = useNavigate()

    const handleClick = () => {
        setShow(!show)
    }

    const postDetails = (pics) => {
        setLoading(true)
        if (pics === undefined) {
            toast({
                title: 'Please Select an Image.',
                status: 'warning',
                duration: 5000,
                position: "bottom",
                isClosable: true,
            })
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData()
            data.append("file", pics)
            data.append("upload_preset", "chat-app")
            data.append("cloud_name", "doi3h7fii")
            fetch("https://api.cloudinary.com/v1_1/doi3h7fii/image/upload", {
                method: 'post',
                body: data
            }).then((res) => res.json())
                .then(data => {
                    setProfile(data.url.toString())
                    console.log(data.url.toString())
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        } else {
            toast({
                title: 'Please Select an Image.',
                status: 'warning',
                duration: 5000,
                position: "bottom",
                isClosable: true,
            })
            return;
        }

    }

    const submitHandler = async () => {
        setLoading(true)
        if (!name || !email || !password || !confirmPassword) {
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
        if (password !== confirmPassword) {
            toast({
                title: 'Password is not Match .',
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
            const { data } = await axios.post("/api/user", { name, email, password, profile },config)
            toast({
                title: 'Registration Success',
                status: 'success',
                duration: 5000,
                position: "bottom",
                isClosable: true,
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
            setLoading(false)
            navigate("/chats")
        } catch (error) {
            toast({
                title: 'Error Occured!.',
                description: error.response.data.message,
                status: 'warning',
                duration: 5000,
                position: "bottom",
                isClosable: true,
            })
            setLoading(false)
        }

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
                {/* Confirm Password  */}
                <FormControl>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={show ? 'text' : 'password'}
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
                type='submit'
                    colorScheme='blue'
                    width={"100%"}
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                    isLoading={loading}
                >
                    Sign Up
                </Button>
            </VStack>
        </>
    )
}

export default Signup