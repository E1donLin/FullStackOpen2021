import React from 'react'
import { connect } from 'react-redux'
import { incrementVoteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes
  anecdotes.sort((a, b) => b.votes - a.votes)

  const voteAnecdote = async (anecdote) => {
    props.incrementVoteOf(anecdote)
    props.setNotification(`You voted for ${anecdote.content}`, 5)
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    ),
  }
}

const mapDispatchToProps = {
  incrementVoteOf,
  setNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
