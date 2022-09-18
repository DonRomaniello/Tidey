
import React, {useState, useRef, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';


import { fetchHarmonics } from '../store/features/harmonics';

import { updateSelected } from '../store/features/stations';

import { useMedia } from 'tiny-use-media-esm';

import L from 'leaflet';

import {
  Marker,
  Popup,
} from 'react-leaflet'

import { Epicycles } from './Epicycles';

import icon from './assets/pin.svg';

const MarkerAndPopup = (props) => {

  const { stationInfo } = props

  const { current } = useMedia({
    mobile: 0,
    desktop: 960,
  })

  const [couldOpen, setCouldOpen] = useState(false)

  const harmonics = useSelector((state) => state.harmonics)

  const dispatch = useDispatch();

  const DefaultIcon = L.icon({
    iconUrl: icon,
    iconAnchor: [16, 42],
    popupAnchor: [0, 0],// this should be half width, full height of popup
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  L.Popup.prototype.options.offset = [0,0] // look here
  L.Popup.prototype.options.maxWidth = '1000%'
  L.Popup.prototype.options.className = 'popuply'

  const position = [stationInfo?.lat, stationInfo?.lng]

  return (
    <>
    <Marker
    autoPan={true}
    autoPanOnFocus={true}
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
      }}}
    >
      <Popup
      // autoPanPadding={autoPanPad}
      autoPan={true}
      autoPanOnFocus={true}
      >
      {(harmonics.loaded && couldOpen) ?
          couldOpen &&
          <Epicycles
          platform={current} />
            :
          <div className='loading' >
            loading...
            </div>}
      </Popup>
    </Marker>
    </>
)
}

export default MarkerAndPopup

