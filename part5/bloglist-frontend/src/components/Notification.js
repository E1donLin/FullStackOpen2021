import React from 'react'

const Notification = ({ message, type }) => {
  const successStyle = {
    color: 'green',
    background: 'lightGray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = {
    color: 'red',
    background: 'lightGray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) return null

  if (type === 'error') {
    return <div style={errorStyle}>{message}</div>
  }

  return <div style={successStyle}>{message}</div>
}

export default Notification
