import React, { useEffect, useState } from 'react'

import Appbar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
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
          console.log(childAreas)
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
              <Typography variant="h6">
                {`${areas[0].parentArea} Area`}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="none" style={{ fontWeight: '600' }}>Name</TableCell>
                    <TableCell padding="none" style={{ fontWeight: '600' }}>Flag</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {areas.map((area) => (
                    <TableRow key={area.id}>
                      <TableCell padding="none" onClick={() => history.push(`/area/${area.id}`)}>{area.name}</TableCell>
                      <TableCell padding="none"><img src={area.ensignUrl} alt="" height="10px" /></TableCell>
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

export default Continent
