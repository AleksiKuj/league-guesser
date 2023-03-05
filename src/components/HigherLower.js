import { useEffect, useState, useRef } from "react"
import championsService from "../services/champions"
import ChampionCard from "./ChampionCard"

import ScoreCard from "./ScoreCard"
import {
  Text,
  Flex,
  Container,
  Box,
  useDisclosure,
  Heading,
  Center,
  useBreakpointValue,
} from "@chakra-ui/react"

const HigherLower = () => {
  const [champions, setChampions] = useState()
  const [champion, setChampion] = useState()
  const [champion2, setChampion2] = useState()
  const [showSkinsLength, setShowSkinsLength] = useState(false)
  const [showSkinsLength2, setShowSkinsLength2] = useState(false)

  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)

  //flex direction column on phones and row on other devices
  const direction = useBreakpointValue({ base: "column", md: "row" })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getAllChampions = async () => {
    try {
      setLoading(true)
      const response = await championsService.getChampions()
      setChampions(response)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }
  const getChampion = async () => {
    try {
      setLoading(true)
      const response = await championsService.getChampion(champions)
      setChampion(response)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }
  const getChampion2 = async () => {
    try {
      setLoading(true)
      const response = await championsService.getChampion(champions)
      setChampion2(response)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAllChampions()
  }, [])

  useEffect(() => {
    if (champions) {
      getChampion()
      getChampion2()
    }
  }, [champions])

  const gameOver = () => {
    onOpen()
  }

  const getChampionsByScore = () => {
    if (score % 2 === 0) {
      getChampion()
      setShowSkinsLength(false)
      setShowSkinsLength2(true)
    } else {
      getChampion2()
      setShowSkinsLength2(false)
      setShowSkinsLength(true)
    }
  }

  const checkAnswer = (champ) => {
    if (champ === champion) {
      if (champ.skins.length >= champion2.skins.length) {
        setScore(score + 1)
        setShowSkinsLength(true)
        getChampionsByScore()
      } else {
        gameOver()
      }
    } else if (champ === champion2) {
      console.log("test")
      if (champ.skins.length >= champion.skins.length) {
        setShowSkinsLength2(true)
        setScore(score + 1)
        getChampionsByScore()
      } else {
        gameOver()
      }
    }
  }

  const restartGame = () => {
    setScore(0)
    getChampion()
    getChampion2()
    setShowSkinsLength(false)
    setShowSkinsLength2(false)
    onClose()
  }

  return (
    <Box overflow="hidden">
      <Heading align="center" as="h2" size="lg">
        Guess which champion has more skins
      </Heading>
      <Container maxW="container.md" px="10" overflow="hidden">
        <Box>
          <Text py="5" fontSize="xl" fontWeight="bold" align="center">
            Score: {score}
          </Text>

          {champion && champion2 && !loading ? (
            <>
              <Center>
                <Flex direction={direction}>
                  <Container my="3">
                    <ChampionCard
                      champion={champion}
                      checkAnswer={() => checkAnswer(champion)}
                      showSkinsLength={showSkinsLength}
                    />
                  </Container>
                  <Container my="3">
                    <ChampionCard
                      champion={champion2}
                      checkAnswer={() => checkAnswer(champion2)}
                      showSkinsLength={showSkinsLength2}
                    />
                  </Container>
                </Flex>
              </Center>
            </>
          ) : (
            <Text></Text>
          )}
        </Box>
      </Container>
      {champion ? (
        <ScoreCard
          score={score}
          isOpen={isOpen}
          onClose={onClose}
          restartGame={restartGame}
        />
      ) : null}
    </Box>
  )
}

export default HigherLower
