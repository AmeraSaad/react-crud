

function SearchBar() {
  return (
    <div className="w-75 mx-auto my-3">
    <input type="text" id="search-input" className="form-control py-2" placeholder="Search by Product Name" onkeyup="productManager.handleSearch()" />
    </div>
  )
}

export default SearchBar
