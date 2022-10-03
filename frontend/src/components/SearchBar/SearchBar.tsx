import './SearchBar.css';

function SearchBar() {
  return (
    <div className="SearchBar">
      <form>
        <label >
          <input  placeholder="Search" className="input-search" type="text" />
        </label>
      </form>
    </div>
  );
}

export default SearchBar;
