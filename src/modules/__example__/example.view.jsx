import React, { useEffect } from 'react'
import { Button, CircularProgress } from '@material-ui/core'

export const ExampleView = ({
  increment= Function,
  reset= Function,
  requestRandomNumber= Function,
  counter= Number,
  isLoading= Boolean,
  error= Object,
}) => {

  const handleIncrementPress = () => increment()
  const handleResetPress = () => reset()
  const handleRandomPress = () => requestRandomNumber()
  const handleForceErrorPress = () => requestRandomNumber()
  const handleError = () => console.log('Error')

  useEffect(() => handleError(), [error])

  if (isLoading) 
    return <CircularProgress size={80} />
  else
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={handleIncrementPress}
          style={styles.linkButton}
        >
          {counter}
        </Button>

        <Button
          variant="outlined"
          color="default"
          onClick={handleResetPress}
          style={styles.linkButton}
        >
          Reset
        </Button>

        <Button
          variant="outlined"
          color="default"
          onClick={handleRandomPress}
          style={styles.linkButton}
        >
          Random
        </Button>

        <Button
          variant="outlined"
          color="default"
          onClick={handleForceErrorPress}
          style={styles.linkButton}
        >
          Force Error
        </Button>
      </>
    )
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    color: 'white',
    textAlign: 'center',
  },
  linkButton: {
    width: 300,
    marginBottom: 10,
  },
}
