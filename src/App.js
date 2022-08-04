// import axios from 'axios';

import React, {useEffect, useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import Map from './components/Map';

// import {
//   fetchStations,
// } from './store/features/stations';


function App() {

  const dispatch = useDispatch();

  const stations = useSelector((state) => state.stations.stations)

  useEffect(() => {
    // dispatch(fetchStations())
  }, [dispatch])

  console.log(stations[0])

  return (
    <div style={mapDivStyle}
    >
      <Map stations={stations}/>
    </div>
  );
}

export default App;

const mapDivStyle = {
  display: 'flex',
  height:'100vh',
  justifyContent: 'center',
  alignItems: 'center',
}
