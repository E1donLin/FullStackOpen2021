import React from 'react'

const Persons = ({ personsToShow, handleDelete }) => {
  const personsList = personsToShow.map((person) => {
    return (
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id, person.name)}>
          delete
        </button>
      </div>
    )
  })

  return <div>{personsList}</div>
}

export default Persons
