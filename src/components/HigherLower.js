import { useEffect, useState } from "react"
import championsService from "../services/champions"

import ScoreCard from "./ScoreCard"
import {
  Spinner,
  Text,
  Flex,
  Container,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Heading,
} from "@chakra-ui/react"

import { Select } from "chakra-react-select"

const HigherLower = () => {
  const [champions, setChampions] = useState()
  const [champion, setChampion] = useState()
  const [champion2, setChampion2] = useState()

  const [guess, setGuess] = useState("")

  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const getAllChampions = async () => {
    try {
      setLoading(true)
      const response = await championsService.getChampions()
      setChampions(response)
      setOptions(
        response.map((champion) => ({
          value: champion.name,
          label: champion.name,
        }))
      )
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

  //   const gameOver = () => {
  //     if (guessesLeft <= 1) {
  //       onOpen()
  //       return true
  //     }
  //   }

  const checkAnswer = (champ) => {
    console.log(champ.skins.length)

    if (champ === champion) {
      if (champ.skins.length >= champion2.skins.length) {
        console.log("correct")
        setScore(score + 1)
        getChampion2()
      }
    } else if (champ === champion2) {
      if (champ.skins.length >= champion.skins.length) {
        console.log("correct")
        setScore(score + 1)
        getChampion()
      }
    } else {
      console.log("wrong")
    }
  }

  const restartGame = () => {
    setScore(0)
    getChampion()
    getChampion2()
    onClose()
  }

  const answer = () => {}
  return (
    <Box>
      <Heading>Higher/lower</Heading>
      <Container maxW="container.md" px="10">
        <Box>
          <Text fontSize="xl" fontWeight="bold" align="center">
            Score: {score}
          </Text>

          {champion && champion2 && !loading ? (
            <>
              <Flex direction="row">
                <Box px="5" onClick={() => checkAnswer(champion)}>
                  <Text fontWeight="bold">{champion.name}</Text>
                </Box>
                <Box px="5" onClick={() => checkAnswer(champion2)}>
                  <Text fontWeight="bold">{champion2.name}</Text>
                </Box>
              </Flex>
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
