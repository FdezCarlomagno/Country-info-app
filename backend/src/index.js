const express = require('express');
require('dotenv').config();
const { fetchPopulationData, fetchFlag, fetchCountryBorders } = require('./functions');
const getIsoCode = require('./getIsoCode')
const cors = require('cors');

const app = express();

// Environment variables
const AVAILABLE_COUNTRIES_URL = process.env.AVAILABLE_COUNTRIES_URL;
const COUNTRY_INFO_URL = process.env.COUNTRY_INFO_URL;
const POPULATION_DATA_URL = process.env.POPULATION_DATA_URL;
const FLAG_URL = process.env.FLAG_URL;
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

//Fix cors errors
app.use(cors());

//Helper function to handle errors
const handleError = (res, error, statusCode = 500) => {
    if (error instanceof Error) {
        return res.status(statusCode).json({ error: error.message });
    }
    return res.status(statusCode).json({ error: 'An unexpected error occurred' });
};


// Get all available countries
app.get('/api/available-countries', async (req, res) => {
    try {
        const response = await fetch(`${AVAILABLE_COUNTRIES_URL}`);

        if (response.status === 404) {
            return res.status(404).json({ error: 'Countries not found' });
        }

        if (!response.ok) {
            return res.status(500).json({ error: 'Something went wrong while fetching countries' });
        }

        const data = await response.json();
        return res.json(data);
    } catch (error) {
        return handleError(res, error);
    }
});

//Get country info (borders, population, flag)

app.get('/api/country-info/:countryCode', async (req, res) => {
    const searchCountry = req.params.countryCode;
    const countryInfo = {
        country: searchCountry,
        borders: [],
        iso2: '',
        population: 0,
        flag: '',
    };

    try {
        // Fetch country borders
        const countryData = await fetchCountryBorders(searchCountry, COUNTRY_INFO_URL);

        if (!countryData.data) {
            return res.status(404).json({ error: countryData.message });
        }

        countryInfo.name = countryData.country;
        countryInfo.borders = countryData.data;

        // Fetch population data
        const populationData = await fetchPopulationData(countryInfo.name, POPULATION_DATA_URL);

        if (!populationData.data) {
            return res.status(404).json({ error: populationData.message });
        }

        countryInfo.population = populationData.data;

        // Fetch flag
        const isoCode = await getIsoCode(countryInfo.name);
        if (!isoCode) {
            return res.status(404).json({ error: 'Could not get iso code' })
        }

        const flagData = await fetchFlag(isoCode.iso, FLAG_URL);

        if (!flagData) {
            return res.status(404).json({ error: 'Flag not found' });
        }

        countryInfo.flag = flagData;
        countryInfo.iso2 = isoCode.iso;

        // Return aggregated country information
        return res.json({ countryInfo, message: 'Success' });
    } catch (error) {
        return handleError(res, error);
    }
});



app.listen(PORT, () => {
    console.log(`Server listening on PORT=${PORT}`);
});
