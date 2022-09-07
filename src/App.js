// import axios from 'axios';

import React, {useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Map from './components/Map';

import CompassRose from './components/CompassRose';

import {
  fetchStations,
} from './store/features/stations';


function App() {

  const dispatch = useDispatch();

  const stations = useSelector((state) => state.stations.stations)

  useEffect(() => {
    dispatch(fetchStations())
  }, [dispatch])

  return (
    <>
    <CompassRose />
    <div style={mapDivStyle}>
      <Map stations={stations}/>
    </div>
    </>
  );
}

export default App;

const mapDivStyle = {
  display: 'flex',
  height:'100vh',
  justifyContent: 'center',
  alignItems: 'center',
}
