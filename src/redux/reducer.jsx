import { combineReducers } from 'redux'

import examples from '../modules/__example__/example.state'

export const reducers = {
  examples,
}

export default combineReducers(reducers)
