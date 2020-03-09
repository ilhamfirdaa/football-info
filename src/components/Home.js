import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [continents, setContinents] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getContinents()
  }, [])

  const getContinents = async () => {
    try {
      axios.defaults.headers.common['X-Auth-Token'] = 'c146a6e19e384f519b9ff4ac1650961f'
      const res = await axios.get('https://api.football-data.org/v2/areas')
      if (res.status === 200) {
        const { areas } = res.data
        const world = areas.filter((area) => area.parentAreaId === 2267 || area.parentArea === 'World')
        setContinents(world)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isLoading
        ? (
          <h5>Loading...</h5>
        )
        : (
          <ul>
            {continents.map((continent) => (
              <Link to={`/continent/${continent.id}`} key={continent.id}>
                <li>{continent.name}</li>
              </Link>
            ))}
          </ul>
        )}
    </>
  )
}

export default Home
