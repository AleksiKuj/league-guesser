import { useEffect, useState } from "react"
import championsService from "../services/champions"

import ScoreCard from "./ScoreCard"
import {
  Spinner,
  Text,
  Container,
  Box,
  useDisclosure,
  Heading,
} from "@chakra-ui/react"

import { Select } from "chakra-react-select"

const LoreGuesser = () => {
  const [champions, setChampions] = useState()
  const [champion, setChampion] = useState()

  const [guess, setGuess] = useState("")
  const [guessesLeft, setGuessesLeft] = useState(5)

  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const getChampions = async () => {
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

  useEffect(() => {
    getChampions()
  }, [])

  useEffect(() => {
    if (champions) {
      getChampion()
    }
  }, [champions])

  const gameOver = () => {
    if (guessesLeft <= 1) {
      onOpen()
      return true
    }
  }

  const checkAnswer = (e) => {
    console.log(e.value)
    if (e.value.toLowerCase() === champion.name.toLowerCase()) {
      console.log("correct")
      setScore(score + 1)
      getChampion()
    } else {
      if (gameOver()) {
        console.log("game over")
      }
      console.log("wrong answer")
      setGuessesLeft(guessesLeft - 1)
      setGuess("")
    }
  }

  const handleChampionChange = (e) => {
    const optionExists = options.some((option) => option.value === e.value)

    if (optionExists) {
      setGuess(e.value)
      checkAnswer(e)
    } else {
      console.log("not exist")
    }
  }

  const restartGame = () => {
    setScore(0)
    setGuessesLeft(5)
    getChampion()
    onClose()
  }
  return (
    <Box>
      <Container maxW="container.md" px="10" h="lg">
        <Box>
          <Heading align="center" as="h2" size="lg">
            Guess the champion from lore
          </Heading>
          <Text fontSize="xl" fontWeight="bold" align="center">
            Score: {score}
          </Text>
          <Text fontSize="xl" fontWeight="bold" align="center">
            Guesses left: {guessesLeft}
          </Text>

          {champion && !loading ? (
            <>
              <Text>{champion.name}</Text>
              {/* setInnerHTML makes <i>tags work</i> */}
              <Text
                dangerouslySetInnerHTML={{
                  __html: champion.lore.replace(
                    new RegExp(champion.name, "g"),
                    "______"
                  ),
                }}
                py="5"
              ></Text>
            </>
          ) : (
            <Spinner size="xl" color="red.500" />
          )}
        </Box>
        <Select
          value={guess}
          onChange={handleChampionChange}
          options={options}
        />
        <Text fontSize="sm" color="gray.500">
          Remember you have only 5 tries per round.
        </Text>
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
export default LoreGuesser
