import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const League = ({ match }) => {
  const { leagueId } = match.params
  const [clubs, setClubs] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getClubs = async () => {
      try {
        axios.defaults.headers.common['X-Auth-Token'] = 'c146a6e19e384f519b9ff4ac1650961f'
        const res = await axios.get(`https://api.football-data.org/v2/competitions/${leagueId}/teams`)
        if (res.status === 200) {
          const { teams } = res.data
          setClubs(teams)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getClubs()
  }, [leagueId])


  return (
    <>
      {isLoading
        ? (
          <h5>Loading...</h5>
        )
        : (
          <ul>
            {clubs.map((club) => (
              <Link to={`/club/${club.id}`} key={club.id}>
                <li>{club.name}</li>
              </Link>
            ))}
          </ul>
        )}
    </>
  )
}

export default League
