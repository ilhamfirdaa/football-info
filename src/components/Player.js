import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

import { apiPlayer } from '../utils/apiHandler'

const Player = ({ match }) => {
  const { playerId } = match.params
  const [player, setPlayer] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const res = await apiPlayer(playerId)
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
