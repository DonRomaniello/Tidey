
import React, {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchHarmonics } from '../store/features/harmonics';

import L from 'leaflet';

import {
  Marker,
  Popup,
} from 'react-leaflet'


import drawVisualizer from './modules/drawHarmonicConstituents';

import icon from './assets/pin.svg';

import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import './css/Epicycles.module.css'

const Epicycles = (props) => {

  const { stationInfo } = props

  const harmonics = useSelector((state) => state.harmonics)

  const [couldOpen, setCouldOpen] = useState(false)

  const dispatch = useDispatch();

  let DefaultIcon = L.icon({
    iconUrl: icon,
    // shadowUrl: iconShadow,
    iconAnchor: [16, 42],
    popupAnchor: [-50, 0],// this should be half width, full height of popup
  });

  L.Popup.prototype.options.offset = [0,0] // look here

  L.Marker.prototype.options.icon = DefaultIcon;

  L.Popup.prototype.options.maxWidth = '1000%'

  L.Popup.prototype.options.className = 'popuply'

  const position = [stationInfo?.lat, stationInfo?.lng]

  const canvasName = `epicycleCanvas + ${stationInfo.id + stationInfo.lat + stationInfo.lng}`

  const stopLooping = () => {
    return couldOpen
  }

  useEffect(() => {
    if (harmonics.loaded && couldOpen) {
      drawVisualizer(harmonics.harmonics, canvasName, 5, [400, 200], stopLooping)
    }
  }, [canvasName, couldOpen, harmonics])

  return (
    <>
    <Marker
    maxWidth='400px'
    position={position}
    autoPan={true}
    autoPanOnFocus={true}
    riseOnHover={true}
    eventHandlers={{
      popupopen: () => {
        dispatch(fetchHarmonics(stationInfo.harmonicConstituents))
        setCouldOpen(true);
      },
      popupclose: () => {
        setCouldOpen(false)
      }
    }}
    >
      <Popup
      autoPanPadding={[500, 250]}
      autoPan={true}
      >
        {((harmonics.loaded) && couldOpen) ?
          <canvas id={canvasName}/>
            :
          <div className='loading' >
            loading...
            </div>}
      </Popup>
    </Marker>
    </>
)
}


export default Epicycles

