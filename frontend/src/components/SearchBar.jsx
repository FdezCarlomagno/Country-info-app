import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState('');

    const handleInputChange = (e) => {
        setSearch(e.target.value);
        if (onSearch) {
            // Lift state up
            onSearch(e.target.value);
        }
    };

    return (
        <>
            <div className="px-4 py-4 my-4">
                <div>
                    <input
                        className="p-4 w-full border rounded-lg hover:shadow-lg transition-shadow"
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search country"
                        value={search}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </>
    );
};

export default SearchBar;
