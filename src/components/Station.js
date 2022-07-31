import React, { useState, useEffect } from 'react';

import {
  MapContainer,
  SVGOverlay,
  TileLayer,
  useMap,
} from 'react-leaflet'


const Station = (props) => {

const position = [40.778041, -73.921264]
const bounds = [
  position,
  [position[0] - .2, position[1] - .1],
]

const overlayStyle = {
  opacity: '.25',
  transform: 'rotate3d(1, 0, 0, 45deg)',
}


  return (
    <>
    <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds} style={{overlayStyle}}>
      {/* <rect x="0" y="0" width="100%" height="100%" fill="blue" opacity='.5' /> */}
      <circle r="5" cx="10" cy="10" fill="red" opacity='1' />
      {/* <text x="50%" y="50%" stroke="white" opacity='.5'>
        text
      </text> */}
    </SVGOverlay>
</>
)
}

export default Station





