import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async (id) => {
  const targetUrl = `${baseUrl}/${id}`
  const returned = await axios.get(targetUrl)
  const anecdote = returned.data

  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }

  const response = await axios.put(targetUrl, updatedAnecdote)

  return response.data
}

const anecdoteService = {
  getAll,
  create,
  update,
}

export default anecdoteService
