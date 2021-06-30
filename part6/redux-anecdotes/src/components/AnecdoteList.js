import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVoteOf } from '../reducers/anecdoteReducer'
import {
  setNotification,
  resetNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter((anecdote) => anecdote.content.includes(filter))
  })

  anecdotes.sort((a, b) => b.votes - a.votes)

  const voteAnecdote = (anecdote) => {
    dispatch(incrementVoteOf(anecdote.id))
    dispatch(setNotification(`You voted for ${anecdote.content}`))
    setTimeout(() => dispatch(resetNotification()), 5000)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
