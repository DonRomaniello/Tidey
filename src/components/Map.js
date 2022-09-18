import React, {useEffect, useState} from 'react';

import {
  MapContainer,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'

import L from 'leaflet';

import { Stations } from './Stations'

import { useMedia } from 'tiny-use-media-esm';


import "leaflet/dist/leaflet.css";

import "./css/timeMarker.css";

import "./css/TopLevelSupplement.css"

import { styling } from './css/Map.module.js'

const Map = () => {

  const position = [41.640078, -124.453125]

  const bounds = L.latLngBounds(L.latLng(90, -360), L.latLng(-90, 360));

  const { current } = useMedia({
    mobile: 0,
    desktop: 960,
  })

  window.scrollTo(50, 50) // For iPad problems.

  return (
    <>
    <MapContainer
    center={position}
    zoomControl={false}
    minZoom={2}
    maxZoom={8}
    maxBounds={bounds}
    maxBoundsViscosity={1.0}
    zoom={3}
    scrollWheelZoom={true}
    style={{...styling[current], ...styling.common}}
    >
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
      />
      <ZoomControl
      position='topleft'
      zoomInText=''
      zoomOutText=''
      />
      <Stations />
  </MapContainer>
</>
)
}

export default Map
