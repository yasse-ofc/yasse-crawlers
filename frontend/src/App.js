import './App.css';
import Dropdown from './components/Dropdown/Droppdown';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResult from './components/SearchResult/SearchResult';
import SelectionBar from './components/SelectionBar/SelectionBar';

function App() {
  return (
    <div className="App">
     <SelectionBar />
     <SearchBar /> 
     <SearchResult />
     <Dropdown />
    </div>
  );
}

export default App;
