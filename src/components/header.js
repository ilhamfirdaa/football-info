import React from 'react'

import Appbar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles(() => ({
  header: {
    boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12)',
  },
  pointer: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))

export default ({ history, titleHeader }) => {
  const classes = useStyles()
  return (
    <Appbar position="fixed" className={classes.header}>
      <Container maxWidth="md" style={{ padding: '8px 16px' }}>
        <Box
          display="flex"
          alignItems="center"
        >
          <ArrowBackIcon
            onClick={() => history.goBack()}
            className={classes.pointer}
          />
          <Typography variant="h6" style={{ display: 'inline-block', marginLeft: '8px' }}>
            {titleHeader}
          </Typography>
        </Box>
      </Container>
    </Appbar>
  )
}
