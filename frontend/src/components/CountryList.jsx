import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCountries } from '../api/countryApi';
import '../App.css';
import SearchBar from './SearchBar';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        setCountries(response);
        setFilteredCountries(response)
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch countries');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(()=> {
    const filtered = countries.filter((country) => 
      country.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCountries(filtered)
  }, [filter])
  

  if (loading) return <div className="text-center p-4"><span className='loader'></span></div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!countries.length) return <div className="text-center text-white p-4 bg-red rounded-md">No countries available</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Countries</h1>
      <SearchBar onSearch={setFilter}/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries.map((country) => (
          <Link
            key={country.countryCode}
            to={`/country/${country.countryCode}`}
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold">{country.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CountryList;