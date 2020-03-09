import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Continent = ({ match }) => {
  const { continentId } = match.params
  const [areas, setAreas] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getAreas()
  }, [])

  const getAreas = async () => {
    try {
      axios.defaults.headers.common['X-Auth-Token'] = 'c146a6e19e384f519b9ff4ac1650961f'
      const res = await axios.get(`https://api.football-data.org/v2/areas/${continentId}`)
      if (res.status === 200) {
        const { childAreas } = res.data
        setAreas(childAreas)
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
            {areas.map((area) => (
              <Link to={`/area/${area.id}`} key={area.id}>
                <li>{area.name}</li>
              </Link>
            ))}
          </ul>
        )}
    </>
  )
}

export default Continent
