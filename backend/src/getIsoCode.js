async function getIsoCode(countryName) {
    const url = 'https://countriesnow.space/api/v0.1/countries/iso';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ country: countryName })
        })

        if (!response.ok) {
            return { iso: null, message: 'Could not get isoCode' }
        }

        const result = await response.json();

        return { iso: result.data.Iso2, message: 'iso code retrieved' }
    } catch (error) {
        console.error(error);
    }
}

module.exports = getIsoCode