
import React from 'react';

import { useSelector } from 'react-redux';

import {
  CircleMarker,
  Polyline,
} from 'react-leaflet'

const Station = (props) => {

const { stationInfo } = props

const timeIndex = useSelector((state) => state.timeIndex.value)

const position = [stationInfo?.lat, stationInfo?.lng]

const linePosition = [
  position,
  [stationInfo?.lat + (Number(stationInfo?.predictions[timeIndex]?.v) * .05),
   stationInfo?.lng]
]

const circleRadius = 5

  return (
    <>
       <CircleMarker center={position} pathOptions={stationMarker} radius={circleRadius} />
       <Polyline pathOptions={waterLevelMarker} positions={linePosition} />
    </>
)
}

const stationMarker = { color: 'black', opacity: '.5' }

const waterLevelMarker = { color: 'green' }

export default Station




