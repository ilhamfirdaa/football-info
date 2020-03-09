import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

const Player = ({ match }) => {
  const { playerId } = match.params
  const [player, setPlayer] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getPlayers = async () => {
      try {
        axios.defaults.headers.common['X-Auth-Token'] = 'c146a6e19e384f519b9ff4ac1650961f'
        const res = await axios.get(`https://api.football-data.org/v2/players/${playerId}`)
        if (res.status === 200) {
          setPlayer(res.data)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getPlayers()
  }, [playerId])


  return (
    <>
      {isLoading
        ? (
          <h5>Loading...</h5>
        )
        : (
          <ul>
            {player.name}
          </ul>
        )}
    </>
  )
}

export default Player
