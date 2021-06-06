import axios from 'axios'
import React, { useEffect, useState } from 'react'

const api_key = process.env.REACT_APP_API_KEY

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState([])

  const languagesList = country.languages.map((language) => (
    <li key={language.name}>{language.name}</li>
  ))

  const fetchWeather = () => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((response) => {
        setWeather(response.data.current)
      })
  }

  useEffect(fetchWeather, [])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>{languagesList}</ul>
      <img src={country.flag} width='100' alt='Flag of the country'></img>
      <h3>Weather in {country.capital}</h3>
      <p>
        <b>Temperature:</b> {weather.temperature} Celsius
      </p>
      <img
        src={weather.weather_icons}
        width='50'
        alt='image of the weather'
      ></img>
      <p>
        <b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  )
}

export default CountryDetails
