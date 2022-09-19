
import React, {useState, useRef, useMemo, useEffect} from 'react';

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
const canvasSize = useMemo(() => canvasSizer(current), [current])

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
      // keepInView={true}
      >
      {(harmonics.loaded && couldOpen) ?
          couldOpen &&
          <Epicycles
          platform={current}
          canvasSize={canvasSize}
           />
            :
          <div className='loading'
          style={{width: canvasSize[1], height:canvasSize[0]}}
          >
            loading...
            </div>}
      </Popup>
    </Marker>
    </>
)
}

export default MarkerAndPopup

