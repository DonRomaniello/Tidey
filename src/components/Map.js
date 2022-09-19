import React, {useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { setCanvasSize } from '../store/features/harmonics';
import {
  MapContainer,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'

import L from 'leaflet';

import { Stations } from './Stations'

import { useMedia } from 'tiny-use-media-esm';

import "leaflet/dist/leaflet.css";

import "./css/TopLevelSupplement.css"

import { styling } from './css/Map.module.js'

const Map = () => {

  const position = [41.640078, -124.453125]

  const bounds = L.latLngBounds(L.latLng(90, -7200), L.latLng(-90, 7200));

  const { canvasSize } =  useSelector((state) => state.harmonics)

  const dispatch = useDispatch()

  const { current } = useMedia({
    mobile: 0,
    desktop: 959,
  })


  useEffect(() => {
    const canvasSizer = (_current) => {
      switch (_current) {
        case 'desktop':
          return [200, 400]
        case 'mobile':
          return [125, 250]
        default:
          return [200, 400]
      }
    }

    dispatch(setCanvasSize(canvasSizer(current)))

}, [current, dispatch])

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
