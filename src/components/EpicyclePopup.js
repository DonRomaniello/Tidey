
import React from 'react';

import { useSelector } from 'react-redux';

import {
  Popup,
} from 'react-leaflet'

const EpicyclePopup = (props) => {

const { stationInfo } = props

const position = [stationInfo?.lat, stationInfo?.lng]

  return (
    <>
    <Popup position={position} offset={[0,0]} autoPan={false} autoClose={false}>
        Here.
    </Popup>
    </>
)
}


export default EpicyclePopup




