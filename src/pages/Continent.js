import React, { useEffect, useState } from 'react'

import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'

import { apiAreas } from '../utils/apiHandler'
import Header from '../components/header'
import Helmet from '../components/title'
import Loader from '../components/loader'

const useStyles = makeStyles((theme) => ({
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
  pointer: {
    '&:hover': {
      cursor: 'pointer',
    },
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
        setAreas([])
        setIsLoading(false)
      }
    }
    getAreas()
  }, [continentId])

  return (
    <>
      <Helmet title="Area Lists" />
      {isLoading
        ? (
          <Loader />
        )
        : (
          <>
            <Header titleHeader={areas[0].parentArea} history={history} />
            <Container maxWidth="md" className={classes.mainContainer}>
              {/* <Typography variant="h6">
                {`${areas[0].parentArea} Area`}
              </Typography> */}
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: '600' }}>Name</TableCell>
                    <TableCell style={{ fontWeight: '600' }}>Flag</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {areas.map((area) => (
                    <TableRow key={area.id}>
                      <TableCell
                        onClick={() => history.push(`/area/${area.id}`)}
                        className={classes.pointer}
                      >
                        {area.name}
                      </TableCell>
                      <TableCell><img src={area.ensignUrl} alt="" height="10px" /></TableCell>
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
