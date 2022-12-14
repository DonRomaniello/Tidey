
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchHarmonics } from '../store/features/harmonics';

import { updateSelected } from '../store/features/stations';

import L from 'leaflet';

import {
  Marker,
  Popup,
} from 'react-leaflet'

import { Epicycles } from './Epicycles';

import icon from './assets/pin.svg';

const MarkerAndPopup = (props) => {

  const { stationInfo } = props

  const [couldOpen, setCouldOpen] = useState(false)

  const harmonics = useSelector((state) => state.harmonics)

  const DefaultIcon = L.icon({
    iconUrl: icon,
    iconAnchor: [16, 42],
    popupAnchor: [0, 0],
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  L.Popup.prototype.options.maxWidth = '100%'
  L.Popup.prototype.options.className = 'popuply'

  const position = [stationInfo?.lat, stationInfo?.lng]

  const dispatch = useDispatch();


  return (
    <>
    <Marker
    position={position}
    riseOnHover={true}
    eventHandlers={{
      popupopen: () => {
        dispatch(fetchHarmonics(stationInfo.harmonicConstituents))
        dispatch(updateSelected(stationInfo.id))
        setCouldOpen(true);
      },
      popupclose: (e) => {
        setCouldOpen(false)
      },
    }}
    >
      <Popup
      autoPan={true}
      autoPanPadding={[10, 10]}
      >
      {(harmonics.loaded && couldOpen) ?
          couldOpen &&
          <Epicycles
           />
            :
          <div className='loading'
          style={{width: harmonics.canvasSize[1], height: harmonics.canvasSize[0]}} />
          }
      </Popup>
    </Marker>
    </>
)
}

export default MarkerAndPopup

