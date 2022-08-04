
import React, { useState, useEffect } from 'react';

import {
  CircleMarker,
  Polyline,
} from 'react-leaflet'

const Station = (props) => {

const { stationInfo } = props

const [predictions, setPredictions] = useState([])

const [linePosition, setLinePosition] = useState([]);

const position = [stationInfo?.lat, stationInfo?.lng]

const circleRadius = 5

  return (
    <>
       <CircleMarker center={position} pathOptions={stationMarker} radius={circleRadius} />
       {/* <Polyline pathOptions={waterLevelMarker} positions={linePosition} /> */}
    </>
)
}

const stationMarker = { color: 'black', opacity: '1' }

const waterLevelMarker = { color: 'green' }

export default Station




