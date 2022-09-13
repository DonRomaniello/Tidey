// import axios from 'axios';

import React, {useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Map from './components/Map';

import CompassRose from './components/CompassRose';

import { fetchStations } from './store/features/stations';

import { closeHelp } from './store/features/help';

import { HelpAndCredits } from './components/HelpAndCredits';


function App() {

  const dispatch = useDispatch();

  const stations = useSelector((state) => state.stations.stations)

  const {helpOpen} = useSelector((state) => state.help)

  useEffect(() => {
    dispatch(fetchStations())
  }, [dispatch])


  return (
    <>
    <div onClick={() => dispatch(closeHelp())}>
    {helpOpen && <HelpAndCredits />}
    <CompassRose />
    <div style={mapDivStyle}>
      <Map stations={stations} />
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
