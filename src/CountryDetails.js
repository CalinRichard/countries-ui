import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Button
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';

const CountryDetails = () => {

  const { id } = useParams();
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetchCountryById(id);
  }, [id]);

  const fetchCountryById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/countries/${id}`);
      if (response.ok) {
        const country = await response.json();
        setSelectedCountry(country);
        console.log(country);

      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.log('Error fetching country:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
        {selectedCountry && (
          <div>
            <h2>{selectedCountry.name}</h2>
            <p>Capital: {selectedCountry.capital}</p>
            <p>Population: {selectedCountry.population.toLocaleString()}</p>
            <p>Timezones: {selectedCountry.timezones ? selectedCountry.timezones.join(', ') : 'None'}</p>
            <p>Subregion: {selectedCountry.subregion}</p>
            <p>Borders: {selectedCountry.borders ? selectedCountry.borders.join(', ') : 'None'}</p>
            <p>Area: {selectedCountry.area.toLocaleString()} km²</p>
            <Link to="/countries">
              <Button variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
                Back to Countries
              </Button>
            </Link>
          </div>
        )}
      </Box>
    </Container >
  );
}

export default CountryDetails;