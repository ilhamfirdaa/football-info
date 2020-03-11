import React, { useEffect, useState } from 'react'

import Appbar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { apiLeagues } from '../utils/apiHandler'

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

const Area = ({ match, history }) => {
  const classes = useStyles()
  const { areaId } = match.params
  const [leagues, setLeagues] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getLeagues = async () => {
      try {
        const res = await apiLeagues()
        if (res.status === 200) {
          const { competitions } = res.data
          const league = competitions.filter((competition) => parseInt(competition.area.id) === parseInt(areaId))
          setLeagues(league)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getLeagues()
  }, [areaId])

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
              <Typography variant="h6">
                {`${leagues[0].area.name} Leagues & Cups`}
              </Typography>
              <Table>
                <TableBody>
                  {leagues.map((league) => (
                    <TableRow key={league.id}>
                      <TableCell padding="none" onClick={() => history.push(`/league/${league.id}`)}>{league.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Container>
          </>
        )}
    </>
  )
}

export default Area
