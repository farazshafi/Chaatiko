import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <>
        <Box 
        px={2}
        py={1}
        m={1}
        mb={2}
        borderRadius={"lg"}
        fontSize={12}
        variant={"solid"}
        backgroundColor={"#79155B"}
        color={"white"}
        cursor={"pointer"}
        onClick={handleFunction}
        >
            {user.name}
            <CloseIcon pl={1}/>
        </Box>
    </>
  )
}

export default UserBadgeItem