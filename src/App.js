// import axios from 'axios';

import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Map from './components/Map';

import CompassRose from './components/CompassRose';

import { fetchStations } from './store/features/stations';

import { initiateHelpClose } from './store/features/help';

import { HelpAndCredits } from './components/HelpAndCredits';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStations())
  }, [dispatch])

  return (
    <>
    <div
    onClick={() => dispatch(initiateHelpClose())}
    >
    <HelpAndCredits />
    <CompassRose />
    <div style={mapDivStyle}>
      <Map />
    </div>
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
