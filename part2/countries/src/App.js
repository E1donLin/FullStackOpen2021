import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import axios from 'axios'
import Countries from './Components/Countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const fetchCountries = () => {
    console.log('effect')
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }

  useEffect(fetchCountries, [])

  return (
    <div>
      <Filter search={search} handleSearch={handleSearch} />
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App
