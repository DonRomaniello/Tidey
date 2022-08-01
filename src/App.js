
import axios from 'axios';

import React, {useEffect, useState} from 'react';

import './App.css';

import ReactLeaflet from './components/reactLeaflet';

function App() {

  const [stations, setStations] = useState([])

  useEffect(() => {

    let url = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions'

    axios.get(url)
    .then(response => {
      const stationData = response.data
      setStations(stationData?.stations)
    })

  }, [])

  return (
    <div style={mapDivStyle}
    >
      <ReactLeaflet stations={stations}/>
    </div>
  );
}

export default App;

const mapDivStyle = {
  display: 'flex',
  height:'100vh',
  justifyContent: 'center',
  alignItems: 'center',
  // transform: 'rotate3d(1, 0, 0, 45deg)',
}
