import { connect } from 'react-redux'
import ExampleView from './example.view'
import {
  selectCount,
  selectLoading,
  selectError,
  increment,
  requestRandomNumber,
  reset,
} from './example.state'

const mapStateToProps = state => ({
  counter: selectCount(state),
  isLoading: selectLoading(state),
  error: selectError(state),
})

const mapActionsToProps = {
  requestRandomNumber,
  increment,
  reset,
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ExampleView)
