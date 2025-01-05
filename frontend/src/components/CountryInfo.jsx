import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getCountryInfo } from '../api/countryApi';
import '../App.css';

function CountryInfo() {
  const { countryCode } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Fetch county info
    const fetchCountryInfo = async () => {
      try {
        const data = await getCountryInfo(countryCode);
        setCountryData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch country information');
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  // Show loader while data is loading
  if (loading) return <div className="text-center p-4"><span className='loader'></span></div>;

  // Handle error 
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  // Handle no data
  if (!countryData) return <div className="text-center p-4">No data available</div>;

  const populationData = countryData?.population?.populationCounts?.map(item => ({
    year: item.year,
    population: item.value
  })) || false;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          ← Back to Countries
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={countryData.flag.data}
            alt={`${countryData.name} flag`}
            className="w-24 h-16 object-cover rounded"
          />
          <h1 className="text-3xl font-bold">{countryData.name}</h1>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Border Countries</h2>
          <div className="flex flex-wrap gap-2">
            {countryData.borders.map((border) => (
              <Link
                key={border.countryCode}
                to={`/country/${border.countryCode}`}
                className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                {border.commonName}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Population Over Time</h2>
          <div className="w-full overflow-x-auto">
            {populationData ? <LineChart
              width={800}
              height={400}
              data={populationData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="population"
                stroke="#8884d8"
                name="Population"
              />
            </LineChart> : 'Population not available'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryInfo;
