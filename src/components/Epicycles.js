
import React, {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchHarmonics } from '../store/features/harmonics';

import L from 'leaflet';

import {
  Marker,
  Popup,
} from 'react-leaflet'


import drawVisualizer from './modules/drawHarmonicConstituents';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';

import './css/Epicycles.module.css'

// import { popupStyle } from './css/Epicycles.module';

const Epicycles = (props) => {

  const { stationInfo } = props

  const harmonics = useSelector((state) => state.harmonics)

  const [couldOpen, setCouldOpen] = useState(false)

  const dispatch = useDispatch();

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [0, 0],
    popupAnchor: [0,0],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  L.Popup.prototype.options.maxWidth = '1000%'



  const position = [stationInfo?.lat, stationInfo?.lng]

  const canvasName = `epicycleCanvas + ${stationInfo.id + stationInfo.lat + stationInfo.lng}`

  useEffect(() => {
    if (harmonics.loaded && couldOpen) {
      console.log(harmonics.harmonics)
      drawVisualizer(harmonics.harmonics, canvasName, 5, [400, 200])
    }
  }, [harmonics])

  return (
    <>
    <Marker
    maxWidth='400px'
    position={position}
    autoPan={true}
    autoPanOnFocus={true}
    riseOnHover={true}
    eventHandlers={{
      click: () => {
        dispatch(fetchHarmonics(stationInfo.harmonicConstituents))
        setCouldOpen(!couldOpen);
      },
    }}
    >
      <Popup
      autoPanPadding={[500, 250]}
      autoPan={true}
      >
        {((harmonics.loaded) && couldOpen) ?
          <canvas id={canvasName} />  :
          <div className='loading' >
            loading...
            </div>}
      </Popup>
    </Marker>
    </>
)
}


export default Epicycles

