import React, { useState, useEffect } from 'react';

import {
  MapContainer,
  SVGOverlay,
  TileLayer,
  useMap,
} from 'react-leaflet'

// import leaflet-pro

import "leaflet/dist/leaflet.css";

const ReactLeaflet = () => {

  const styling = {
    display: 'flex',
    height:'90vh',
    width:'90vw',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:'10px',
  }

const position = [40.778041, -73.921264]
const bounds = [
  position,
  [position[0] - .1, position[1] - .1],
]

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
    zoom={10}
    scrollWheelZoom={false}
    style={styling}>
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors |
        Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
      />
        <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds} style={{overlayStyle}}>
      <rect x="0" y="0" width="100%" height="100%" fill="blue" opacity='.5' />
      <circle r="5" cx="10" cy="10" fill="red" opacity='.5' />
      <text x="50%" y="50%" stroke="white" opacity='.5'>
        text
      </text>
    </SVGOverlay>
</MapContainer>
</>
)
}

export default ReactLeaflet
