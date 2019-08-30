import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './Note'

const App = () => {

  const [ newCountry, setNewCountry] = useState("")
  const [ countries, setCountries] = useState([]) 

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const rows = () => countries.map(country =>
    <Note 
      name={country.name}
      />
  )

  const languages = () => countries.map( country => 
    country.languages.map( language =>
    <li> {language.name} </li>
  )
  )
  
  const stats = () => countries.map( country =>
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
    </div>
  )


  const handleCountryChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewCountry(event.target.value)
    const flags = 'gi'
    const regex = new RegExp(`${newCountry}`, flags)
    const filt = country => country.name.match(regex)
    setCountries(countries.filter(filt))
  }

  if (countries.length > 10) {
    return (
      <div>
        <h1>Data for Countries!</h1>
        <div>
          find countries <input defaultValue={newCountry} onChange={handleCountryChange} />
        </div>
        <h2>Countries found</h2>
        <p>too many matches, please be more specific</p>
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        <h1>Data for Countries!</h1>
        <div>
          find countries <input defaultValue={newCountry} onChange={handleCountryChange} />
        </div>
        <h2>Countries found</h2>
          <div>
            <ul>
              {rows()}
            </ul>
          </div>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Data for Countries!</h1>
        <div>
          find countries <input defaultValue={newCountry} onChange={handleCountryChange} />
        </div>
        <div>
          <div>
            {stats()}
          </div>
          <h1>languages</h1>
          <ul>
              {languages()}
          </ul>
        </div>
      </div>
    )
  }
}

export default App;
