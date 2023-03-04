import axios from "axios"
import { useEffect, useState } from "react"
import championsService from "./services/champions"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HigherLower from "./components/HigherLower"
import LoreGuesser from "./components/LoreGuesser"
import Nav from "./components/Nav"
import { Routes, BrowserRouter as Router, Link, Route } from "react-router-dom"

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
} from "@chakra-ui/react"
import { Select } from "chakra-react-select"

//http://ddragon.leagueoflegends.com/cdn/13.4.1/data/en_US/champion/Aatrox.json
//http://ddragon.leagueoflegends.com/cdn/13.4.1/data/en_US/champion.json
//http://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/Aatrox.png

function App() {
  // const [champions, setChampions] = useState()
  // const [champion, setChampion] = useState()

  // const [guess, setGuess] = useState("")
  // const [guessesLeft, setGuessesLeft] = useState(5)

  // const [score, setScore] = useState(0)
  // const [loading, setLoading] = useState(true)
  // const [options, setOptions] = useState([])

  // const { isOpen, onOpen, onClose } = useDisclosure()

  // const getChampions = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await championsService.getChampions()
  //     setChampions(response)
  //     setOptions(
  //       response.map((champion) => ({
  //         value: champion.name,
  //         label: champion.name,
  //       }))
  //     )
  //     setLoading(false)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  // const getChampion = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await championsService.getChampion(champions)
  //     setChampion(response)
  //     setLoading(false)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // useEffect(() => {
  //   getChampions()
  // }, [])

  // useEffect(() => {
  //   if (champions) {
  //     getChampion()
  //   }
  // }, [champions])

  // const gameOver = () => {
  //   if (guessesLeft <= 1) {
  //     onOpen()
  //     return true
  //   }
  // }

  // const checkAnswer = (e) => {
  //   console.log(e.value)
  //   if (e.value.toLowerCase() === champion.name.toLowerCase()) {
  //     console.log("correct")
  //     setScore(score + 1)
  //     getChampion()
  //   } else {
  //     if (gameOver()) {
  //       console.log("game over")
  //     }
  //     console.log("wrong answer")
  //     setGuessesLeft(guessesLeft - 1)
  //     setGuess("")
  //   }
  // }

  // const handleChampionChange = (e) => {
  //   const optionExists = options.some((option) => option.value === e.value)

  //   if (optionExists) {
  //     setGuess(e.value)
  //     checkAnswer(e)
  //   } else {
  //     console.log("not exist")
  //   }
  // }

  // const restartGame = () => {
  //   setScore(0)
  //   setGuessesLeft(5)
  //   getChampion()
  //   onClose()
  // }

  return (
    <Flex direction={"column"} minH="100vh" maxW="100vw">
      <Flex direction={"column"} grow="1">
        <Header />
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<LoreGuesser />} />
            <Route path="/higherlower" element={<HigherLower />} />
          </Routes>
        </Router>
      </Flex>

      <Footer />
    </Flex>
  )
}

export default App
