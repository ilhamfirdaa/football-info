import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.football-data.org/v2',
  timeout: 60000,
  headers: {
    'X-Auth-Token': 'c146a6e19e384f519b9ff4ac1650961f',
  },
})

const sendReq = async (url) => {
  const res = await instance.get(url)
  return res
}

export const apiContinents = () => sendReq('/areas')

export const apiAreas = (continentId) => sendReq(`/areas/${continentId}`)

export const apiLeagues = () => sendReq('/competitions')

export const apiClubs = (leagueId) => sendReq(`/competitions/${leagueId}/teams`)

export const apiSquads = (clubId) => sendReq(`/teams/${clubId}`)

export const apiPlayer = (playerId) => sendReq(`/players/${playerId}`)
