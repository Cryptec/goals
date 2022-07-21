import './App.css';
import GoalElement from './Components/Goals';
import ToggleSwitch from './Components/Toggle';

function App() {
  return (
    <div className="App">
    <div className="bar">
      
    </div>
      <div className='toggleSwitch'>
      
      <ToggleSwitch values={['light', 'default', 'dark']} selected="default" />
      </div>
      <div>
        <GoalElement />
      </div>
    </div>
  );
}

export default App;
