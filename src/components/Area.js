import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Area = ({ match }) => {
  const { areaId } = match.params
  const [leagues, setLeagues] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getLeagues = async () => {
      try {
        axios.defaults.headers.common['X-Auth-Token'] = 'c146a6e19e384f519b9ff4ac1650961f'
        const res = await axios.get('https://api.football-data.org/v2/competitions')
        if (res.status === 200) {
          const { competitions } = res.data
          const league = competitions.filter((competition) => parseInt(competition.area.id) === parseInt(areaId))
          setLeagues(league)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getLeagues()
  }, [leagues])


  return (
    <>
      {isLoading
        ? (
          <h5>Loading...</h5>
        )
        : (
          <ul>
            {leagues.map((league) => (
              <Link to={`/league/${league.id}`} key={league.id}>
                <li>{league.name}</li>
              </Link>
            ))}
          </ul>
        )}
    </>
  )
}

export default Area