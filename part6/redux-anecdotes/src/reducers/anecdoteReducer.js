import anecdoteService from '../services/anecdote'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INCREMENT_VOTE':
      return state.map((anecdote) =>
        anecdote.id !== action.data.id ? anecdote : action.data
      )

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const incrementVoteOf = ({ id }) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(id)
    dispatch({
      type: 'INCREMENT_VOTE',
      data: updatedAnecdote,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
