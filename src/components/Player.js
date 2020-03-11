import React, { useEffect, useState } from 'react'

import Appbar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { apiPlayer } from '../utils/apiHandler'

import avatar from '../assets/images/avatar.svg'

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
}))

const Player = ({ match, history }) => {
  const classes = useStyles()
  const { playerId } = match.params
  const [player, setPlayer] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const res = await apiPlayer(playerId)
        if (res.status === 200) {
          setPlayer(res.data)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getPlayers()
  }, [playerId])


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
            <Container maxWidth="xl" className={classes.mainContainer}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <img src={avatar} alt="avatar" width="64" height="64" />
                <Typography variant="h6">
                  {player.firstName}
                </Typography>
              </Box>
              <Divider className={classes.divider} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption">
                    Full Name
                  </Typography>
                  <Typography variant="subtitle1">
                    {player.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption">
                    Nationality
                  </Typography>
                  <Typography variant="subtitle1">
                    {player.nationality}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption">
                    Position
                  </Typography>
                  <Typography variant="subtitle1">
                    {player.position}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption">
                    Age/Birthday
                  </Typography>
                  <Typography variant="subtitle1">
                    {player.dateOfBirth}
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </>
        )}
    </>
  )
}

export default Player
