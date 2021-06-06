import React from 'react'
import Country from './Country'
import CountryDetails from './CountryDetails'

const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length === 1) {
    return <CountryDetails country={countriesToShow[0]} />
  }
  if (countriesToShow.length > 10) {
    return <p>Too many results</p>
  } else {
    const countriesList = countriesToShow.map((country) => (
      <Country key={country.numericCode} country={country} />
    ))
    return <div>{countriesList}</div>
  }
}

export default Countries
