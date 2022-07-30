import React, { useState, useEffect } from 'react';

import {
  MapContainer,
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
    borderRadius:'10px'
  }


  return (
    <>
    <MapContainer
    center={[40.778041, -73.921264]}
    zoom={10}
    scrollWheelZoom={false}
    style={styling}>
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors |
        Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
      />
</MapContainer>
</>
)
}

export default ReactLeaflet
