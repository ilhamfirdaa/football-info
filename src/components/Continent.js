import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { apiAreas } from '../utils/apiHandler'

const Continent = ({ match }) => {
  const { continentId } = match.params
  const [areas, setAreas] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getAreas = async () => {
      try {
        const res = await apiAreas(continentId)
        if (res.status === 200) {
          const { childAreas } = res.data
          setAreas(childAreas)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAreas()
  }, [continentId])

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
