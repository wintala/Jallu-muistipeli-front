import axios from "axios"
const baseUrl = "https://jallu-backend.herokuapp.com/api/scores/"

const newScore = async (playername, score) => {
	const req = {playername, score}
  return axios.post(baseUrl, req)
}

const getTopScores = async () => {
  return axios.get(baseUrl+"top10").then(r => r.data)
}

export default {newScore, getTopScores}