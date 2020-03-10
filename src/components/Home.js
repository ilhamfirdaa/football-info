import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { apiContinents } from '../utils/apiHandler'

const Home = () => {
  const [continents, setContinents] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getContinents()
  }, [])

  const getContinents = async () => {
    try {
      const res = await apiContinents()
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
