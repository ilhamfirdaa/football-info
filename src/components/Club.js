import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Club = ({ match }) => {
  const { clubId } = match.params
  const [squads, setSquads] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSquads = async () => {
      try {
        axios.defaults.headers.common['X-Auth-Token'] = 'c146a6e19e384f519b9ff4ac1650961f'
        const res = await axios.get(`https://api.football-data.org/v2/teams/${clubId}`)
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
