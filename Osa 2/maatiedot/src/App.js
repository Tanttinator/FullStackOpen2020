import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import Display from './components/Display'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState(null)

  const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    Axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  const getWeather = () => {
    if(filtered.length === 1) {
      Axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${filtered[0].capital}`).then(response => {
        setWeather(response.data)
      })
    } else {
      setWeather(null)
    }
  }

  useEffect(getWeather, [filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)

  }

  return (
    <div>
      <form>
        <div>
          Find Countries: <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>
      <Display countries={filtered} weather={weather} setFilter={setFilter} />
    </div>
  );
}

export default App;
