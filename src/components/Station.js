import React, { useState, useEffect } from 'react';

import {
  CircleMarker
} from 'react-leaflet'


const Station = (props) => {

const { stationInfo } = props

const position = [stationInfo?.lat, stationInfo?.lng]

const overlayStyle = {
  opacity: '.25',
  transform: 'rotate3d(1, 0, 0, 45deg)',
}

const circleRadius = 10

console.log(stationInfo)

  return (
    <>
       <CircleMarker center={position} pathOptions={stationMarker} radius={3} />
    </>
)
}

const stationMarker = { color: 'blue', opacity: '.2' }


export default Station





