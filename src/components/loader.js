import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  loaderContainer: {
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
  },
}))

export default () => {
  const classes = useStyles()
  return (
    <div className={classes.loaderContainer}>
      <div className="spinner" />
    </div>
  )
}
