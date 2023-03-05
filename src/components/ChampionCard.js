import { useState } from "react"
import {
  Spinner,
  Text,
  Box,
  Card,
  CardBody,
  Image,
  Fade,
} from "@chakra-ui/react"

const ChampionCard = ({ champion, checkAnswer, showSkinsLength }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Card
      maxW="md"
      onClick={checkAnswer}
      minH="560px"
      overflow="hidden"
      bg="transparent"
      p="0"
      _hover={{
        cursor: "pointer",
      }}
    >
      <CardBody position="relative" p="0">
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display={isLoading ? "flex" : "none"}
          justifyContent="center"
          alignItems="center"
        ></Box>
        {isLoading && <Spinner />}

        <Fade in={!isLoading} transition={{ enter: { duration: 1 } }}>
          <Image
            key={champion.id}
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
            alt={champion.name}
            borderRadius="lg"
            onLoad={() => {
              setIsLoading(false)
            }}
            display={isLoading ? "none" : "block"}
            objectFit="cover"
            h="560px"
            w="100%"
          />
        </Fade>

        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="white"
          fontWeight="semibold"
        >
          <Box
            bg="white"
            color="black"
            px="5"
            borderBottom={"3px solid black"}
            borderRight={"3px solid black"}
            borderTop={"2px solid black"}
            borderLeft={"2px solid black"}
            fontSize="lg"
          >
            <Text>{champion.name}</Text>
            <Text>{showSkinsLength ? champion.skins.length : null}</Text>
          </Box>
        </Box>
      </CardBody>
    </Card>
  )
}

export default ChampionCard
