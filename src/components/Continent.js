import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Appbar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { apiAreas } from '../utils/apiHandler'

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

const Continent = ({ match, history }) => {
  const classes = useStyles()
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
          <div className={classes.loaderContainer}>
            <div className="spinner" />
          </div>
        )
        : (
          <>
            <Appbar position="fixed" className={classes.header}>
              <Container maxWidth="md" style={{ padding: '8px 16px' }}>
                <ArrowBackIcon onClick={() => history.goBack()} />
              </Container>
            </Appbar>
            <Container maxWidth="md" className={classes.mainContainer}>
              <ul>
                {areas.map((area) => (
                  <Link to={`/area/${area.id}`} key={area.id}>
                    <li>{area.name}</li>
                  </Link>
                ))}
              </ul>
            </Container>
          </>
        )}
    </>
  )
}

export default Continent
