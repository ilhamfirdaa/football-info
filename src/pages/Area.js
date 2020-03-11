import React, { useEffect, useState } from 'react'

import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'

import { apiLeagues } from '../utils/apiHandler'
import Header from '../components/header'
import Helmet from '../components/title'
import Loader from '../components/loader'
import { DataNotFound } from './NotFound'

const useStyles = makeStyles((theme) => ({
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
  pointer: {
    '&:hover': {
      cursor: 'pointer',
    },
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
        setLeagues([])
        setIsLoading(false)
      }
    }
    getLeagues()
  }, [areaId])

  const handleChangeRoute = (league) => {
    history.push({
      pathname: `/league/${league.id}`,
      state: { league },
    })
  }

  return (
    <>
      <Helmet title="League Lists" />
      {isLoading
        ? (
          <Loader />
        )
        : (
          <>
            <Header titleHeader="Domestic Leagues & Cups" history={history} />
            <Container maxWidth="md" className={classes.mainContainer}>
              {/* <Typography variant="h6">
                {`${leagues[0].area.name} Leagues & Cups`}
              </Typography> */}
              {leagues.length === 0
                ? <DataNotFound />
                : (
                  <Table size="small">
                    <TableBody>
                      {leagues.map((league) => (
                        <TableRow key={league.id}>
                          <TableCell
                            onClick={() => handleChangeRoute(league)}
                            className={classes.pointer}
                          >
                            {league.name}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
            </Container>
          </>
        )}
    </>
  )
}

export default Area
