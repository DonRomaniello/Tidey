import React, { useState, useEffect } from 'react';

import {
  MapContainer,
  TileLayer,
  useMap,
} from 'react-leaflet'


import Station from './Station';

// import leaflet-pro css
import "leaflet/dist/leaflet.css";

const ReactLeaflet = (props) => {

  const { stations } = props;

  const position = [40.778041, -73.921264]

  const overlayStyle = {
    // display: 'flex',
    // height:'100vh',
    // justifyContent: 'center',
    // alignItems: 'center',
    opacity: '.25',
    transform: 'rotate3d(1, 0, 0, 45deg)',
  }

  return (
    <>
    <MapContainer
    center={position}
    zoom={14}
    // scrollWheelZoom={true}
    style={styling}>
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors |
        Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        />
      {stations.map((stationInfo, idx) => {
        if (stationInfo.lat & stationInfo.lng % stationInfo.reference_id) {
          return <Station
                  key={stationInfo.stationID}
                  stationInfo={stationInfo} />
            }
          return null

      })}

</MapContainer>
</>
)
}

export default ReactLeaflet

const styling = {
  display: 'flex',
  height: 'calc(100vh - 100px)',
  width: 'calc(100vw - 100px)',
  // margin
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:'10px',
}