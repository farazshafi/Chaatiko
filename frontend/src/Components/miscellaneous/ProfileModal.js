import { ViewIcon } from '@chakra-ui/icons'
import {
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Image,
    Text,
} from '@chakra-ui/react'
import React from 'react'


const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
            )
            }
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                    fontSize={"30px"}
                    fontFamily="Work sans"
                    display={"flex"}
                    justifyContent={"center"}
                    >
                    {user.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    >
                    <Image 
                        borderRadius={"full"}
                        boxSize={"100px"}
                        src={user.profile}
                        alt = {user.name}
                    />
                    <Text
                    fontSize={{base:"15px", md:"25px"}}
                    fontFamily={"Work sans"}
                    >
                    Email: {user.email}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal