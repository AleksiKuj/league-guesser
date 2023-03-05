import { Box, Flex, HStack, Link } from "@chakra-ui/react"

import { Link as RouteLink } from "react-router-dom"

const Nav = () => {
  return (
    <Box py="5">
      <HStack spacing="10" justify="space-between">
        <Flex justify="center" flex="1">
          <HStack spacing="5">
            <Link as={RouteLink} to="/">
              Lore Guesser
            </Link>
            <Link as={RouteLink} to="/higherlower">
              Higher or Lower
            </Link>
            <Link as={RouteLink} to="/colorguesser">
              Color Guesser
            </Link>
          </HStack>
        </Flex>
      </HStack>
    </Box>
  )
}
export default Nav
