import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import Appbar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { apiSquads } from '../utils/apiHandler'

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
  title: {
    backgroundColor: '#CFD2D4',
    padding: theme.spacing(0.5),
    margin: theme.spacing(1, 0),
  },
  link: {
    textDecoration: 'none',
  },
}))

const Club = ({ match, history, location }) => {
  const classes = useStyles()
  const { clubId } = match.params
  const { clubInfo } = location.state
  const [squads, setSquads] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSquads = async () => {
      try {
        const res = await apiSquads(clubId)
        if (res.status === 200) {
          const { squad } = res.data
          setSquads(squad)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getSquads()
  }, [clubId, clubInfo])

  const ClubInformation = () => (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <img src={clubInfo.crestUrl} alt="avatar" width="64" height="64" />
        <Typography variant="h6">
          {clubInfo.shortName}
        </Typography>
      </Box>
      <Box className={classes.title}>
        Club Information
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Typography variant="caption">
            Full Name
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle2">
            {clubInfo.name}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">
            Founded in
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle2">
            {clubInfo.founded}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">
            Location
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle2">
            {clubInfo.area.name}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">
            Home
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle2">
            {clubInfo.venue}
          </Typography>
        </Grid>
      </Grid>
    </>
  )

  const ContactInformation = () => (
    <>
      <Box className={classes.title}>
        Contact Information
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Typography variant="caption">
            Phone
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle2">
            {clubInfo.phone}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">
            Email
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle2">
            {clubInfo.email}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">
            Address
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle2">
            {clubInfo.address}
          </Typography>
        </Grid>
      </Grid>
    </>
  )

  const CoachTable = () => (
    <>
      <Box className={classes.title}>
        Coach
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="none" style={{ fontWeight: '600' }}>Name</TableCell>
            <TableCell padding="none" style={{ fontWeight: '600' }} align="right">Age</TableCell>
            <TableCell padding="none" style={{ fontWeight: '600' }} align="right">Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {squads.map((player) => (
            player.role === 'COACH'
            && (
            <TableRow key={player.id}>
              <Link
                to={`/player/${player.id}`}
                className={classes.link}
              >
                <TableCell padding="none">{player.name}</TableCell>
              </Link>
              <TableCell padding="none" align="right">{moment(player.dateOfBirth).fromNow().split(' ')[0]}</TableCell>
              <TableCell padding="none" align="right">{player.nationality}</TableCell>
            </TableRow>
            )
          ))}
        </TableBody>
      </Table>
    </>
  )

  const AttackerTable = () => (
    <>
      <Box className={classes.title}>
        Attacker
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="none" style={{ fontWeight: '600' }}>Name</TableCell>
            <TableCell padding="none" style={{ fontWeight: '600' }} align="right">Age</TableCell>
            <TableCell padding="none" style={{ fontWeight: '600' }} align="right">Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {squads.map((player) => (
            player.position === 'Attacker'
                        && (
                        <TableRow key={player.id}>
                          <Link
                            to={`/player/${player.id}`}
                            className={classes.link}
                          >
                            <TableCell padding="none">{player.name}</TableCell>
                          </Link>
                          <TableCell padding="none" align="right">{moment(player.dateOfBirth).fromNow().split(' ')[0]}</TableCell>
                          <TableCell padding="none" align="right">{player.nationality}</TableCell>
                        </TableRow>
                        )
          ))}
        </TableBody>
      </Table>
    </>
  )

  const MidfielderTable = () => (
    <>
      <Box className={classes.title}>
        Midfielder
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="none" style={{ fontWeight: '600' }}>Name</TableCell>
            <TableCell padding="none" style={{ fontWeight: '600' }} align="right">Age</TableCell>
            <TableCell padding="none" style={{ fontWeight: '600' }} align="right">Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {squads.map((player) => (
            player.position === 'Midfielder'
                        && (
                        <TableRow key={player.id}>
                          <Link
                            to={`/player/${player.id}`}
                            className={classes.link}
                          >
                            <TableCell padding="none">{player.name}</TableCell>
                          </Link>
                          <TableCell padding="none" align="right">{moment(player.dateOfBirth).fromNow().split(' ')[0]}</TableCell>
                          <TableCell padding="none" align="right">{player.nationality}</TableCell>
                        </TableRow>
                        )
          ))}
        </TableBody>
      </Table>
    </>
  )

  const DefenderTable = () => (
    <>
      <Box className={classes.title}>
        Defender
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="none" style={{ fontWeight: '600' }}>Name</TableCell>
            <TableCell padding="none" style={{ fontWeight: '600' }} align="right">Age</TableCell>
            <TableCell padding="none" style={{ fontWeight: '600' }} align="right">Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {squads.map((player) => (
            player.position === 'Defender'
                        && (
                        <TableRow key={player.id}>
                          <Link
                            to={`/player/${player.id}`}
                            className={classes.link}
                          >
                            <TableCell padding="none">{player.name}</TableCell>
                          </Link>
                          <TableCell padding="none" align="right">{moment(player.dateOfBirth).fromNow().split(' ')[0]}</TableCell>
                          <TableCell padding="none" align="right">{player.nationality}</TableCell>
                        </TableRow>
                        )
          ))}
        </TableBody>
      </Table>
    </>
  )

  const GoalkeeperTable = () => (
    <>
      <Box className={classes.title}>
        Goalkeeper
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="none" style={{ fontWeight: '600' }}>Name</TableCell>
            <TableCell padding="none" style={{ fontWeight: '600' }} align="right">Age</TableCell>
            <TableCell padding="none" style={{ fontWeight: '600' }} align="right">Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {squads.map((player) => (
            player.position === 'Goalkeeper'
                        && (
                        <TableRow key={player.id}>
                          <Link
                            to={`/player/${player.id}`}
                            className={classes.link}
                          >
                            <TableCell padding="none">{player.name}</TableCell>
                          </Link>
                          <TableCell padding="none" align="right">{moment(player.dateOfBirth).fromNow().split(' ')[0]}</TableCell>
                          <TableCell padding="none" align="right">{player.nationality}</TableCell>
                        </TableRow>
                        )
          ))}
        </TableBody>
      </Table>
    </>
  )

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
              <ClubInformation />
              <ContactInformation />
              <CoachTable />
              <AttackerTable />
              <MidfielderTable />
              <DefenderTable />
              <GoalkeeperTable />
            </Container>
          </>
        )}
    </>
  )
}

export default Club
