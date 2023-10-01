import './App.css';
import DropDown from './components/DropDown';  

function App() {
  return (
    <div className="App">
      <header>
        <h1>RIE ordering service</h1>
      {<DropDown /> }
      </header>
    </div>
  );
}


export default App;