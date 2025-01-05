
const fetchCountryBorders = async (countryCode, url) => {
    try {
        const response = await fetch(`${url}/${countryCode}`);

        if (!response.ok) {
            return { country: countryBorders.commonName, data: [], message: 'Country info not found' };
        }

        const countryBorders = await response.json();

        if (!countryBorders) {
            return { country: null, data: [], message: 'Country info not found' };
        }
        return { country: countryBorders.commonName, data: countryBorders.borders || [], message: 'Success' };

    } catch (error) {
        if (error instanceof Error) {
            return { data: [], message: error.message }
        }
    }
}

const fetchPopulationData = async (countryName, url) => {
    try {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ country: countryName })
        })

        if (!response.ok) {
            return { data: [], message: 'Country population not found' };
        }

        const result = await response.json();

        if (!result) {
            return { data: [], message: 'Failed to fetch population info' }
        }
        return { data: result.data, message: 'Return population info, success' };

    } catch (error) {
        if (error instanceof Error) {
            return { data: [], message: error.message }
        }
    }
}


const fetchFlag = async (countryCode, url) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ iso2: countryCode }),
        });

        if (!response.ok) {
            return { data: [], message: 'Country flag not found' };
        }

        const result = await response.json();

        if (!result || !result.data || !result.data.flag) {
            return { data: [], message: 'Failed to fetch country flag' };
        }

        // Return only the flag
        return { data: result.data.flag, message: 'Return flag, success' };
    } catch (error) {
        return { data: [], message: error instanceof Error ? error.message : 'Unexpected error' };
    }
};


module.exports = { fetchCountryBorders, fetchPopulationData, fetchFlag }