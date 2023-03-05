import Header from "./components/Header"
import Footer from "./components/Footer"
import HigherLower from "./components/HigherLower"
import LoreGuesser from "./components/LoreGuesser"
import Nav from "./components/Nav"
import { Routes, BrowserRouter as Router, Route } from "react-router-dom"

import { Flex } from "@chakra-ui/react"

//http://ddragon.leagueoflegends.com/cdn/13.4.1/data/en_US/champion/Aatrox.json
//http://ddragon.leagueoflegends.com/cdn/13.4.1/data/en_US/champion.json
//http://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/Aatrox.png

function App() {
  return (
    <Flex direction={"column"} minH="100vh" maxW="100vw" overflow="hidden">
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
