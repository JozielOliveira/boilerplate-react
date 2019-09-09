import React, { Component } from 'react'
import { Button, CircularProgress } from '@material-ui/core'

type Props = {
  increment: Function,
  reset: Function,
  requestRandomNumber: Function,
  counter: number,
  isLoading: boolean,
  error: Object,
}

export default class ExampleView extends Component<Props> {
  componentDidUpdate(prevProps): void {
    const { error } = this.props
    if (error && error !== prevProps.error) {
      this.handleError()
    }
  }

  handleIncrementPress = (): void => {
    this.props.increment()
  }

  handleResetPress = (): void => {
    this.props.reset()
  }

  handleRandomPress = (): void => {
    this.props.requestRandomNumber()
  }

  handleForceErrorPress = (): void => {
    this.props.requestRandomNumber()
  }

  handleError = (): void => {
    console.log('Error')
  }

  render(): Component {
    if (this.props.isLoading) return <CircularProgress size={80} />
    else
      return (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleIncrementPress}
            style={styles.linkButton}
          >
            {this.props.counter}
          </Button>

          <Button
            variant="outlined"
            color="default"
            onClick={this.handleResetPress}
            style={styles.linkButton}
          >
            Reset
          </Button>

          <Button
            variant="outlined"
            color="default"
            onClick={this.handleRandomPress}
            style={styles.linkButton}
          >
            Random
          </Button>

          <Button
            variant="outlined"
            color="default"
            onClick={this.handleForceErrorPress}
            style={styles.linkButton}
          >
            Force Error
          </Button>
        </>
      )
  }
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
