import React, { useState, useEffect } from 'react';

import {
  MapContainer,
  TileLayer,
  useMap,
} from 'react-leaflet'

import "leaflet/dist/leaflet.css";



const ReactLeaflet = () => {

  const styling = {
    height:'50vh',
    width:'50vw'
  }


  return (
    <>
    <MapContainer
    center={[70, -79]}
    zoom={10}
    scrollWheelZoom={false}
    style={styling}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
</MapContainer>
</>
)
}

export default ReactLeaflet
