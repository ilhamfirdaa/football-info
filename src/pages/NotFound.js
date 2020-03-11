import React from 'react'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import Helmet from '../components/title'
import notFound from '../assets/images/not_found.svg'
import warning from '../assets/images/warning.svg'


const useStyles = makeStyles(() => ({
  mainContainer: {
    position: 'absolute',
    top: '25%',
  },
  warningContainer: {
    position: 'absolute',
    top: '25%',
    padding: '0',
    margin: '0',
    textAlign: 'center',
  },
}))

const NotFound = ({ history }) => {
  const classes = useStyles()
  return (
    <>
      <Helmet title="Page Not Found" />
      <Container maxWidth="md" align="center" className={classes.mainContainer}>
        <img src={notFound} alt="not found" width="80%" />
        <Typography variant="h6">
          Page not found
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </Container>
    </>
  )
}

export const DataNotFound = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.warningContainer}>
        <img src={warning} alt="not found" width="60%" />
        <Typography variant="h6">
          Something went wrong
        </Typography>
      </div>
    </>
  )
}

export default NotFound
