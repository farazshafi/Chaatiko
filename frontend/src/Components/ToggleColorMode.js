import React from 'react'
import { Button } from "@chakra-ui/button"
import { useColorMode } from "@chakra-ui/color-mode"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

const ToggleColorMode = ({pos,mb,ml}) => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Button
            onClick={() => toggleColorMode()}
            top="0"
            right="0"
            pos={pos}
            m="1rem"
            marginLeft={0}
            mb={mb}
        >
            {colorMode === "dark" ? (
                <SunIcon color="orange.300" />
            ) : (
                <MoonIcon color={"blue.700"} />
            )}
        </Button>
    )
}

export default ToggleColorMode