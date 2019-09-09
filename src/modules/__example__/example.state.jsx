// Initial state
export const initialState = {
  count: 0,
  isLoading: false,
  error: null,
}

// Actions
export const INCREMENT = 'ExampleState/INCREMENT'
export const RESET = 'ExampleState/RESET'
export const RANDOM_REQUEST = 'ExampleState/RANDOM_REQUEST'
export const RANDOM_SUCCESS = 'ExampleState/RANDOM_SUCCESS'
export const RANDOM_FAILURE = 'ExampleState/RANDOM_FAILURE'

// Action creators
export const increment = () => ({ type: INCREMENT })

export const reset = () => ({ type: RESET })

export const randomRequestSuccess = payload => ({
  type: RANDOM_SUCCESS,
  payload,
})

export const randomRequestFailure = error => ({
  type: RANDOM_FAILURE,
  payload: error.message,
})

export const requestRandomNumber = () => async dispatch => {
  dispatch({
    type: RANDOM_REQUEST,
  })

  try {
    await new Promise(r => setTimeout(() => r(10), 250))
    const randomNumber = Math.ceil(Math.random() * 100)

    dispatch(randomRequestSuccess(randomNumber))
  } catch (e) {
    dispatch(randomRequestFailure(e))
  }
}

// Reducer
export default (state= initialState, action= {}) => {
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
export const selectCount = ({ examples }) => examples.count
export const selectLoading = ({ examples }) => examples.isLoading
export const selectError = ({ examples }) => examples.error
