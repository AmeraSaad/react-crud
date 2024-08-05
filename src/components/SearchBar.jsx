import {useState} from 'react';

function SearchBar({ handleSearch }) {
  const [query, setQuery] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <div className="w-75 mx-auto my-3">
    <input type="text" id="search-input" className="form-control py-2" placeholder="Search by Product Name"
      value={query}
      onChange={onChange}/>
    </div>
  )
}

export default SearchBar
