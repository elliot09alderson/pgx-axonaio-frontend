import React, { useState } from 'react';
import { getAllCountries, getStatesOfCountry, getCitiesOfState } from 'country-state-city';

const CountryStateCitySelector = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const countries = getAllCountries();
  const states = selectedCountry ? getStatesOfCountry(selectedCountry.isoCode) : [];
  const cities = selectedState ? getCitiesOfState(selectedState.isoCode) : [];

  const handleCountryChange = (event) => {
    const countryIsoCode = event.target.value;
    setSelectedCountry(countries.find((country) => country.isoCode === countryIsoCode));
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (event) => {
    const stateIsoCode = event.target.value;
    setSelectedState(states.find((state) => state.isoCode === stateIsoCode));
    setSelectedCity(null);
  };

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cities.find((city) => city.id === parseInt(cityId));
  };

  return (
    <div>
      <h2>Country, State, and City Selector</h2>
      <div>
        <label>Select a Country:</label>
        <select onChange={handleCountryChange}>
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry && (
        <div>
          <label>Select a State:</label>
          <select onChange={handleStateChange}>
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedState && (
        <div>
          <label>Select a City:</label>
          <select onChange={handleCityChange}>
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedCountry && selectedState && selectedCity && (
        <div>
          <p>
            You selected: {selectedCountry.name}, {selectedState.name}, {selectedCity.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default CountryStateCitySelector;
