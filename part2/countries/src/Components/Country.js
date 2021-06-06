import React, { useState } from 'react'
import CountryDetails from './CountryDetails'

const Country = ({ country }) => {
  const [details, setDetails] = useState(false)

  const handleDetails = (event) => {
    setDetails(!details)
  }

  if (details) {
    return (
      <div>
        <CountryDetails country={country} />
        <button onClick={handleDetails}>hide</button>
      </div>
    )
  } else {
    return (
      <div>
        {country.name}
        <button onClick={handleDetails}>show</button>
      </div>
    )
  }
}

export default Country
