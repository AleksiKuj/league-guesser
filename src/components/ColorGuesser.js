import { useEffect, useState } from "react"
import { FastAverageColor } from "fast-average-color"
import championsService from "../services/champions"
import ScoreCard from "./ScoreCard"

import {
  Button,
  Text,
  Container,
  Box,
  useDisclosure,
  Heading,
  Image,
  Flex,
  Center,
} from "@chakra-ui/react"
import { Select } from "chakra-react-select"

const ColorGuesser = () => {
  const [champions, setChampions] = useState()
  const [champion, setChampion] = useState()

  const [guess, setGuess] = useState("")
  const [guessesLeft, setGuessesLeft] = useState(5)
  const [gameInProgress, setGameInProgress] = useState(false)

  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState([])
  const [hexColor, setHexColor] = useState("")
  const [hexColor2, setHexColor2] = useState("")
  const [hexColor3, setHexColor3] = useState("")
  const [hexColor4, setHexColor4] = useState("")
  const [hexColor5, setHexColor5] = useState("")

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
    }
  }

  const restartGame = () => {
    setScore(0)
    setGuessesLeft(5)
    getChampion()
    onClose()
    setGameInProgress(true)
  }

  const img = document.querySelector("#champion-image")
  const fac = new FastAverageColor()

  const getColors = () => {
    const imgWidth = img.naturalWidth
    const imgHeight = img.naturalWidth

    const firstFifthEndIndex = Math.floor(imgWidth / 5)
    const secondFifthEndIndex = Math.floor((imgWidth * 2) / 5)
    const thirdFifthEndIndex = Math.floor((imgWidth * 3) / 5)
    const fourthFifthEndIndex = Math.floor((imgWidth * 4) / 5)
    const fifthFifthEndIndex = imgWidth

    const firstFifthCanvas = document.createElement("canvas")
    firstFifthCanvas.width = firstFifthEndIndex
    firstFifthCanvas.height = imgHeight

    const secondFifthCanvas = document.createElement("canvas")
    secondFifthCanvas.width = secondFifthEndIndex - firstFifthEndIndex
    secondFifthCanvas.height = imgHeight

    const thirdFifthCanvas = document.createElement("canvas")
    thirdFifthCanvas.width = thirdFifthEndIndex - secondFifthEndIndex
    thirdFifthCanvas.height = imgHeight

    const fourthFifthCanvas = document.createElement("canvas")
    fourthFifthCanvas.width = fourthFifthEndIndex - thirdFifthEndIndex
    fourthFifthCanvas.height = imgHeight

    const fifthFifthCanvas = document.createElement("canvas")
    fifthFifthCanvas.width = fifthFifthEndIndex - fourthFifthEndIndex
    fifthFifthCanvas.height = imgHeight

    const firstFifthCtx = firstFifthCanvas.getContext("2d")
    firstFifthCtx.drawImage(
      img,
      0,
      0,
      firstFifthEndIndex,
      imgHeight,
      0,
      0,
      firstFifthEndIndex,
      imgHeight
    )

    const secondFifthCtx = secondFifthCanvas.getContext("2d")
    secondFifthCtx.drawImage(
      img,
      firstFifthEndIndex,
      0,
      secondFifthCanvas.width,
      imgHeight,
      0,
      0,
      secondFifthCanvas.width,
      imgHeight
    )

    const thirdFifthCtx = thirdFifthCanvas.getContext("2d")
    thirdFifthCtx.drawImage(
      img,
      secondFifthEndIndex,
      0,
      thirdFifthCanvas.width,
      imgHeight,
      0,
      0,
      thirdFifthCanvas.width,
      imgHeight
    )

    const fourthFifthCtx = fourthFifthCanvas.getContext("2d")
    fourthFifthCtx.drawImage(
      img,
      fourthFifthEndIndex,
      0,
      fourthFifthCanvas.width,
      imgHeight,
      0,
      0,
      fourthFifthCanvas.width,
      imgHeight
    )

    const fifthFifthCtx = fifthFifthCanvas.getContext("2d")
    fifthFifthCtx.drawImage(
      img,
      fourthFifthEndIndex,
      0,
      fifthFifthCanvas.width,
      imgHeight,
      0,
      0,
      fifthFifthCanvas.width,
      imgHeight
    )

    fac.getColorAsync(firstFifthCanvas).then((color) => {
      setHexColor(color.hex)
    })

    fac.getColorAsync(secondFifthCanvas).then((color) => {
      setHexColor2(color.hex)
    })

    fac.getColorAsync(thirdFifthCanvas).then((color) => {
      setHexColor3(color.hex)
    })

    fac.getColorAsync(fourthFifthCanvas).then((color) => {
      setHexColor4(color.hex)
    })
    fac.getColorAsync(fifthFifthCanvas).then((color) => {
      setHexColor5(color.hex)
    })
  }

  useEffect(() => {
    if (img) {
      setTimeout(() => {
        getColors()
      }, 500)
    }
  }, [champion])

  return (
    <Box>
      <Container maxW="container.md" px="10" h="lg">
        <Box>
          <Heading align="center" as="h2" size="lg">
            Guess the champion from colors
          </Heading>
          <Text align="center" color="leagueGrey.200" fontSize="sm">
            Warning: extra difficult
          </Text>
          <Text fontSize="xl" fontWeight="bold" align="center">
            Score: {score}
          </Text>
          <Text fontSize="xl" fontWeight="bold" align="center">
            Guesses left: {guessesLeft}
          </Text>
          {!gameInProgress && (
            <Center>
              <Button onClick={() => restartGame()} bg="leagueGold.200" my="5">
                Start
              </Button>
            </Center>
          )}

          <Flex mb="5">
            <Box w="200px" h="200px" bg={hexColor}></Box>
            <Box w="200px" h="200px" bg={hexColor2}></Box>
            <Box w="200px" h="200px" bg={hexColor3}></Box>
            <Box w="200px" h="200px" bg={hexColor4}></Box>
            <Box w="200px" h="200px" bg={hexColor5}></Box>
          </Flex>
          <Container>
            {champion && (
              <Image
                id="champion-image"
                crossOrigin="anonymous"
                display="none"
                src={`https://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${champion.id}.png`}
              />
            )}
          </Container>
        </Box>
        <Box color="black" bg="white">
          <Select
            value={guess}
            onChange={handleChampionChange}
            options={options}
            colorScheme="cyan"
          />
        </Box>
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
          champion={champion}
        />
      ) : null}
    </Box>
  )
}
export default ColorGuesser
