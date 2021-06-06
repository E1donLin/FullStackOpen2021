import React from 'react'

const Filter = ({ newSearch, handleSearch }) => {
  return (
    <form>
      filter shown with
      <input value={newSearch} onChange={handleSearch} />
    </form>
  )
}

export default Filter
