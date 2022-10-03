import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResult from './components/SearchResult/SearchResult';
import SelectionBar from './components/SelectionBar/SelectionBar';
import SelectionLgs from './components/SelectionLgs/SelectionLgs';

function App() {
  return (
    <div className="App">
     <SearchBar /> 
     <div className="test">
      <SelectionBar />
      <SelectionLgs />
     </div>
     <SearchResult />
    </div>
  );
}

export default App;
