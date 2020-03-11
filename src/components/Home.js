import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Appbar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { apiContinents } from '../utils/apiHandler'

const continentList = ['AFR', 'ASI', 'EUR', 'NCA', 'OCE', 'SAM']

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)',
  },
  mainContainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  divider: {
    margin: theme.spacing(2),
  },
  loaderContainer: {
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
  },
}))

const Home = () => {
  const classes = useStyles()
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
        const world = areas.filter((area) => (area.parentAreaId === 2267 || area.parentArea === 'World') && continentList.includes(area.countryCode))
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
          <div className={classes.loaderContainer}>
            <div className="spinner" />
          </div>
        )
        : (
          <>
            <Appbar position="fixed" className={classes.header}>
              <Container maxWidth="md" style={{ padding: '8px 16px' }}>
                <Typography variant="h6">
                  Home
                </Typography>
              </Container>
            </Appbar>
            <Container maxWidth="md" className={classes.mainContainer}>
              <ul>
                {continents.map((continent) => (
                  <Link to={`/continent/${continent.id}`} key={continent.id}>
                    <li>{continent.name}</li>
                  </Link>
                ))}
              </ul>
            </Container>
          </>
        )}
    </>
  )
}

export default Home
