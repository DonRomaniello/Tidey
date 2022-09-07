import React from 'react';

import {
  MapContainer,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'


import Epicycles from './Epicycles';


import "leaflet/dist/leaflet.css";

import "./css/timeMarker.css";

import "./css/TopLevelSupplement.css"

const ReactLeaflet = (props) => {

  const { stations } = props;

  const position = [40.778041, -73.921264]


  return (
    <>
    <MapContainer
    center={position}
    zoomControl={false}
    zoom={7}
    scrollWheelZoom={true}
    style={styling}>
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors |
        Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        />
        <ZoomControl position='topleft' zoomInText='' zoomOutText='' />
      {stations.map((stationInfo, idx) => {
        if (stationInfo.lat & stationInfo.lng & stationInfo.id) {
          return <Epicycles
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

export default ReactLeaflet

const styling = {
  display: 'flex',
  height: 'calc(100vh - 100px)',
  width: 'calc(100vw - 100px)',
  // margin
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius:'30px',
}
