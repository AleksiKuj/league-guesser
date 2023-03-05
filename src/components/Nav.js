import { Box, Link } from "@chakra-ui/react"

import { Link as RouteLink } from "react-router-dom"

const Nav = () => {
  return (
    <Box align="center">
      <Link as={RouteLink} to="/">
        Lore Guesser
      </Link>
      <Link as={RouteLink} to="/higherlower">
        Higher or Lower
      </Link>
    </Box>
  )
}
export default Nav
