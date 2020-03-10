import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { apiSquads } from '../utils/apiHandler'

const Club = ({ match }) => {
  const { clubId } = match.params
  const [squads, setSquads] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSquads = async () => {
      try {
        const res = await apiSquads(clubId)
        if (res.status === 200) {
          const { squad } = res.data
          setSquads(squad)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getSquads()
  }, [clubId])


  return (
    <>
      {isLoading
        ? (
          <h5>Loading...</h5>
        )
        : (
          <ul>
            {squads.map((player) => (
              <Link to={`/player/${player.id}`} key={player.id}>
                <li>{player.name}</li>
              </Link>
            ))}
          </ul>
        )}
    </>
  )
}

export default Club
