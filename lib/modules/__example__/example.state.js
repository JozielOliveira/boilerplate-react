// Initial state
export const initialState = {
  count: 0,
  isLoading: false,
  error: null,
}

// Actions
export const INCREMENT = 'ExempleState/INCREMENT'
export const RESET = 'ExempleState/RESET'
export const RANDOM_REQUEST = 'ExempleState/RANDOM_REQUEST'
export const RANDOM_SUCCESS = 'ExempleState/RANDOM_SUCCESS'
export const RANDOM_FAILURE = 'ExempleState/RANDOM_FAILURE'

// Action creators
export const increment = (): Object => ({ type: INCREMENT })

export const reset = (): Object => ({ type: RESET })

export const randomRequestSuccess = (payload: number): Object => ({
  type: RANDOM_SUCCESS,
  payload,
})

export const randomRequestFailure = (error: Error): Object => ({
  type: RANDOM_FAILURE,
  payload: error.message,
})

export const requestRandomNumber = (): void => async dispatch => {
  dispatch({
    type: RANDOM_REQUEST,
  })

  try {
    let randomNumber = await new Promise(r => setTimeout(() => r(10), 250))
    randomNumber = parseInt(Math.random() * 100)

    dispatch(randomRequestSuccess(randomNumber))
  } catch (e) {
    dispatch(randomRequestFailure(e))
  }
}

// Reducer
export default (state = initialState, action = {}): Object => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 }

    case RANDOM_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case RANDOM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        count: action.payload,
      }

    case RANDOM_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case RESET:
      return initialState

    default:
      return state
  }
}

// Selectors
export const selectCount = ({ exemples }) => exemples.count
export const selectLoading = ({ exemples }) => exemples.isLoading
export const selectError = ({ exemples }) => exemples.error
