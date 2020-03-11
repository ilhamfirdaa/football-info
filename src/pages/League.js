import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Appbar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { apiClubs } from '../utils/apiHandler'
import Helmet from '../components/title'
import Loader from '../components/loader'
import { DataNotFound } from './NotFound'

import noImage from '../assets/images/no_image.svg'

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

const League = ({ match, history, location }) => {
  const classes = useStyles()
  const { leagueId } = match.params
  const { league } = location.state
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
        setClubs([])
        setIsLoading(false)
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
      <Helmet title="Club Lists" />
      {isLoading
        ? (
          <Loader />
        )
        : (
          <>
            <Appbar position="fixed" className={classes.header}>
              <Container maxWidth="md" style={{ padding: '8px 16px' }}>
                <Box
                  display="flex"
                  alignItems="center"
                >
                  <ArrowBackIcon onClick={() => history.goBack()} />
                  <Typography variant="h6" style={{ display: 'inline-block', marginLeft: '8px' }}>
                    {league.name}
                  </Typography>
                </Box>
              </Container>
            </Appbar>
            <Container maxWidth="md" className={classes.mainContainer} align="center">
              {clubs.length === 0
                ? <DataNotFound />
                : (
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
                          <Typography variant="subtitle1">
                            {club.name}
                          </Typography>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                )}
            </Container>
          </>
        )}
    </>
  )
}

export default League
