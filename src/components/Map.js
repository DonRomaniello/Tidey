import React, {useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { closeHelp } from '../store/features/help';

import {
  MapContainer,
  Popup,
  TileLayer,
  useMap,
  ZoomControl,
} from 'react-leaflet'

import MarkerAndPopup from './MarkerAndPopup'

import { useMedia } from 'tiny-use-media-esm';


import "leaflet/dist/leaflet.css";

import "./css/timeMarker.css";

import "./css/TopLevelSupplement.css"

import { styling } from './css/Map.module.js'

const Map = (props) => {

  const { stations } = props;

  const position = [40.778041, -73.921264]

  const sizeStyle = {
    desktop: {
      height: `${window.innerHeight - 100}px`,
      width: `${window.innerWidth - 100}px`,
    },
    mobile: {
      // height: `${window.innerHeight - 50}px`,
      // width: `${window.innerWidth - 50}px`,
    },
  }

  const { current } = useMedia({
    mobile: 0,
    desktop: 800,
  })

  window.scrollTo(50, 50)

  return (
    <>
    <MapContainer
    center={position}
    zoomControl={false}
    zoom={7}
    scrollWheelZoom={true}
    style={{...sizeStyle[current], ...styling[current]}}
    >
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors |
        // Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        />
        <ZoomControl position='topleft' zoomInText='' zoomOutText='' />
      {stations.map((stationInfo, idx) => {
        if (stationInfo.lat & stationInfo.lng & stationInfo.id) {
          return <MarkerAndPopup
                  key={stationInfo.id + stationInfo.lat + stationInfo.lng}
                  stationInfo={stationInfo}
                  />
            }
          return null
      })}
  </MapContainer>
</>
)
}

export default Map
