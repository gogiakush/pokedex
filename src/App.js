import './App.css';
import List from './List.js';
import Team from './Team.js';
import TopButton from './TopButton.js';
import SearchBar from './SearchBar.js';

function App() {
  return (
    <div className="App">
      <Team />
      <SearchBar />
      <List />
      <TopButton />
    </div>
  );
}

export default App;
