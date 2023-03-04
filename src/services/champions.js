import axios from "axios"

const baseUrl =
  "http://ddragon.leagueoflegends.com/cdn/13.4.1/data/en_US/champion"

const getChampions = async () => {
  try {
    const response = await axios.get(`${baseUrl}.json`)
    console.log("data", Object.values(response.data.data))
    return Object.values(response.data.data)
  } catch (e) {
    console.log(e)
  }
}

const getChampion = async (champions) => {
  try {
    const response = await axios.get(
      `${baseUrl}/${
        champions[Math.floor(Math.random() * champions.length)].id
      }.json`
    )
    return Object.values(response.data.data)[0]
  } catch (e) {
    console.log(e)
  }
}

const exports = {
  getChampions,
  getChampion,
}
export default exports
