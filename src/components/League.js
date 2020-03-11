import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Appbar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { apiClubs } from '../utils/apiHandler'

import noImage from '../assets/images/no-image.svg'

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

const League = ({ match, history }) => {
  const classes = useStyles()
  const { leagueId } = match.params
  const [clubs, setClubs] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getClubs = async () => {
      try {
        const res = await apiClubs(leagueId)
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

  const defaultSrc = (ev) => {
    // eslint-disable-next-line no-param-reassign
    ev.target.src = noImage
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
                <ArrowBackIcon onClick={() => history.goBack()} />
              </Container>
            </Appbar>
            <Container maxWidth="md" className={classes.mainContainer} align="center">
              <Grid container spacing={2}>
                {clubs.map((club) => (
                  <Grid item xs={6} sm={4} md={3} key={club.id}>
                    <Link
                      to={{
                        pathname: `/club/${club.id}`,
                        state: {
                          clubInfo: club,
                        },
                      }}
                      className={classes.link}
                    >
                      <img src={club.crestUrl === null ? noImage : club.crestUrl} onError={defaultSrc} alt={club.name} height="60px" />
                      <Typography variant="h6">
                        {club.name}
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

export default League
