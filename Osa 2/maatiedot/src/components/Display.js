import React from 'react'

const CountryInfo = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
            </ul>
            <img src={country.flag} width="200" height="100" alt="flag"/>
        </div>
    )
}

const Display = ({countries, weather, setFilter}) => {

    if(countries.length === 1) {

        const country = countries[0]
        const capital = country.capital

        if(weather != null) {
            return (
                <div>
                    <CountryInfo country={country} />
                    <h3>Weather in {capital}</h3>
                    <p>Temperature: {weather.current.temperature} C</p>
                    <img src={weather.current.weather_icons[0]} width="100" height="100" alt="Weather Icon" />
                    <p>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
                </div>
            )
        } else {
            return (
                <CountryInfo country={country} />
            )
        }
    }

    if(countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    if(countries.length <= 10) {
        return (
            <div>
                {countries.map((country, i) => 
                    <div key={i}>
                        {country.name}
                        <button onClick={() => setFilter(country.name)}>Show</button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <p>No mathces</p>
    )

}

export default Display