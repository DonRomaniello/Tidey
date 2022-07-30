import logo from './logo.svg';

import './App.css';

import ReactLeaflet from './components/reactLeaflet';

function App() {

  const mapDivStyle = {
    display: 'flex',
    height:'100vh',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <div style={mapDivStyle}
    >
      <ReactLeaflet />
    </div>
  );
}

export default App;
