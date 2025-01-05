import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const getCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/available-countries`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching countries:', error.message);
    return { data: [] };
  }
};

export const getCountryInfo = async (countryCode) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/country-info/${countryCode}`);
    return response.data.countryInfo || null;
  } catch (error) {
    console.error('Error fetching country info:', error.message);
    return null;
  }
};