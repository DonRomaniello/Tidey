
import React, {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchHarmonics } from '../store/features/harmonics';

import L from 'leaflet';

import {
  Marker,
  Popup,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

import drawVisualizer from './modules/drawHarmonicConstituents';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const Epicycles = (props) => {

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

  const { stationInfo } = props

  const position = [stationInfo?.lat, stationInfo?.lng]

  useEffect(() => {
    if (harmonics.loaded && couldOpen) {
      console.log(harmonics.harmonics)
      drawVisualizer(harmonics.harmonics, 5, [200, 200])
    }
  }, [harmonics])

  return (
    <>
    <Marker
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
      autoClose={false}>
        {((harmonics.loaded) && couldOpen) ?
          <canvas id="epicycleCanvas" />  :
          <div className='loading' >
            loading...
            </div>}
      </Popup>
    </Marker>
    </>
)
}


export default Epicycles

