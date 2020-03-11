import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Appbar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { apiClubs } from '../utils/apiHandler'

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)',
  },
  mainContainer: {
    marginTop: theme.spacing(10),
  },
  divider: {
    margin: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
    color: 'black',
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


  return (
    <>
      {isLoading
        ? (
          <h5>Loading...</h5>
        )
        : (
          <>
            <Appbar position="fixed" className={classes.header}>
              <Container maxWidth="xl" style={{ padding: '8px' }}>
                <ArrowBackIcon onClick={() => history.goBack()} />
              </Container>
            </Appbar>
            <Container maxWidth="xl" className={classes.mainContainer} align="center">
              <Grid container spacing={2}>
                {clubs.map((club) => (
                  <Grid item xs={6} key={club.id}>
                    <Link
                      to={{
                        pathname: `/club/${club.id}`,
                        state: {
                          clubInfo: club,
                        },
                      }}
                      className={classes.link}
                    >
                      <img src={club.crestUrl} alt={club.name} height="60px" />
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
