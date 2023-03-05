import {
  Box,
  Text,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Image,
} from "@chakra-ui/react"
//http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg
const ScoreCard = ({ score, isOpen, onClose, restartGame, champion }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent textAlign="center" bg="leagueGold.200">
        <ModalHeader>You got {score} correct</ModalHeader>
        <ModalBody align="center">
          {champion && (
            <>
              <Text>The corrent answer was {champion.name}</Text>
              <Image
                src={`http://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${champion.name}.png`}
              ></Image>
            </>
          )}
          <Text>Better luck next time!</Text>
        </ModalBody>
        <Center>
          <ModalFooter>
            <Button
              bg="leagueBlue.500"
              color="white"
              mr={3}
              onClick={restartGame}
            >
              Restart
            </Button>
          </ModalFooter>
        </Center>
      </ModalContent>
    </Modal>
  )
}
export default ScoreCard
