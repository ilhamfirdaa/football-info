import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Appbar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { apiContinents } from '../utils/apiHandler'
import Helmet from '../components/title'
import Loader from '../components/loader'

import Asia from '../components/asia'
import Africa from '../components/africa'
import Europe from '../components/europe'
import NorthAmerica from '../components/northAmerica'
import Oceania from '../components/oceania'
import SouthAmerica from '../components/southAmerica'

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
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  loaderContainer: {
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
  },
}))

const continentList = ['AFR', 'ASI', 'EUR', 'NCA', 'OCE', 'SAM']

const continentMap = new Map([
  ['AFR', <Africa />],
  ['ASI', <Asia />],
  ['EUR', <Europe />],
  ['NCA', <NorthAmerica />],
  ['OCE', <Oceania />],
  ['SAM', <SouthAmerica />],
])

const getMap = (code) => continentMap.get(code)

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
      setContinents([])
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet title="Continent Lists" />
      {isLoading
        ? (
          <Loader />
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
            <Container maxWidth="md" className={classes.mainContainer} align="center">
              <Grid container spacing={2}>
                {continents.map((continent) => (
                  <Grid item xs={6} key={continent.id}>
                    <Link to={`/continent/${continent.id}`} className={classes.link}>
                      {getMap(continent.countryCode)}
                      <Typography variant="h6">
                        {continent.name}
                      </Typography>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </>
        )}
    </>
  )
}

export default Home
