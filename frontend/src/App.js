import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResult from './components/SearchResult/SearchResult';
import SelectionBar from './components/SelectionBar/SelectionBar';

function App() {
  return (
    <div className="App">
     <SearchBar /> 
     <SearchResult />
     <SelectionBar />
    </div>
  );
}

export default App;
