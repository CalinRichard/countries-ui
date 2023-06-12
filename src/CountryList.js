import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

const CountryList = () => {

  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(countries.length / countriesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    fetchCountries();
  }, []);


  const fetchCountries = async () => {
    try {
      const response = await fetch('http://localhost:3000/countries', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      setCountries(data);
      console.log(data);
    } catch (error) {
      console.log('Error fetching countries:', error);
    }
  };


  return (

    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          List of Countries
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: '105%', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell style={{ fontSize: '105%', fontWeight: 'bold' }}>Capital</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCountries.map(country => (
                <TableRow key={country.id} component={Link} to={`/countries/${country.id}`}>
                  <TableCell>{country.name}</TableCell>
                  <TableCell>{country.capital}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
}

export default CountryList;