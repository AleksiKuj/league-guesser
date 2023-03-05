import { Box, Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
const Footer = () => {
  return (
    <Box
      bgGradient="linear-gradient(to right, leagueGold.500, leagueGold.400)"
      mt="5"
      py="5"
      align="center"
    >
      <Link href="https://github.com/AleksiKuj" target="_blank">
        My GitHub <ExternalLinkIcon mx="2px" />
      </Link>
    </Box>
  )
}
export default Footer
